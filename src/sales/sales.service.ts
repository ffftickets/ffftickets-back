import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { customError } from 'src/common/helpers/custom-error.helper';
import { LocalitiesService } from 'src/localities/localities.service';
import { TicketStatus } from 'src/tickets/enum/ticket-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { SaleStatus } from './enum/sale-status.enum';
import { User } from 'src/user/entities/user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
//Cola de espera


@Injectable()
export class SalesService {
  logger = new Logger(SalesService.name);

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly ticketService: TicketsService,
    private readonly localitiesService: LocalitiesService,
    private readonly firebaseService: FirebaseService,
    private readonly encryptionService: EncryptionService,
 
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      
      const verifyExist = await this.verifyPendingPurchase(
        createSaleDto.customer.id,
      );
      if (verifyExist)
        throw new ConflictException(
          'Tu pedido no se pudo completar ya que actualmente tienes pedidos pendientes de validación.',
        );

      const event = await this.eventService.findOne(createSaleDto.event);
      createSaleDto.event = event;

      const { tickets, ...createSale } = createSaleDto;

      for (const element of tickets) {
        element.locality = await this.localitiesService.findOne(
          element.locality,
        );
        if (
          element.locality.capacity <
          element.locality.sold + element.quantity
        )
          throw new ConflictException(
            `Actualmente quedan ${
              element.locality.capacity - element.locality.sold
            } para la localidad ${element.locality.name}`,
          );
      }

      if (createSaleDto.promoter) {
        const promoter = await this.userService.findOne({
          id: createSaleDto.promoter,
        });
        createSaleDto.promoter = promoter;
      }

      const sale = await this.saleRepository.create(createSale);
      const newSale = await this.saleRepository.save(sale);

      const newTickets = await this.ticketService.create({
        sale: newSale,
        detail: tickets,
      });
      return {
        message:
          'Compra realizada con éxito y a la espera del pago a espera de pago',
        saleId: sale.id,
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [sales, totalCount] = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .leftJoin('sale.promoter', 'promoter')
        .select([
          'sale',
          'customer.id',
          'customer.name',
          'customer.email',
          'promoter.id',
          'promoter.name',
          'promoter.email',
        ])
        .where('promoter.id IS NOT NULL OR promoter.id IS NULL')
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (totalCount === 0) {
        throw new NotFoundException('No se encuentran ventas');
      }

      const decryptedSales = sales.map((sale) => {
        sale.customer.name = this.encryptionService.decryptData(
          sale.customer.name,
        );
        sale.customer.email = this.encryptionService.decryptData(
          sale.customer.email,
        );

        if (sale.promoter) {
          sale.promoter.name = this.encryptionService.decryptData(
            sale.promoter.name,
          );
          sale.promoter.email = this.encryptionService.decryptData(
            sale.promoter.email,
          );
        }

        return sale;
      });

      const totalPages = Math.ceil(totalCount / limit);

      return {
        sales: decryptedSales,
        currentPage: page,
        pageSize: limit,
        totalPages,
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOne(id: number) {
    try {
      const sale = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoinAndSelect('sale.customer', 'customer')
        .leftJoinAndSelect('sale.promoter', 'promoter')
        .where('sale.id = :id', { id })
        .andWhere('(promoter.id IS NOT NULL OR promoter.id IS NULL)')
        .select([
          'sale',
          'customer.id',
          'customer.name',
          'customer.email',
          'promoter.id',
          'promoter.name',
          'promoter.email',
        ])
        .getOne();

      if (!sale) {
        throw new NotFoundException('No se encontró la venta');
      }

      sale.customer.name = this.encryptionService.decryptData(
        sale.customer.name,
      );
      sale.customer.email = this.encryptionService.decryptData(
        sale.customer.email,
      );

      if (sale.promoter) {
        sale.promoter.name = this.encryptionService.decryptData(
          sale.promoter.name,
        );
        sale.promoter.email = this.encryptionService.decryptData(
          sale.promoter.email,
        );
      }

      return sale;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findByCustomer(id: number, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [sales, totalCount] = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.event', 'event')
        .leftJoinAndSelect('sale.tickets', 'ticket')
        .leftJoinAndSelect('ticket.locality', 'locality')
        .where('customer.id = :customer', { customer: id })
        .andWhere('sale.status = :status', { status: SaleStatus.SOLD })
        .select([
          'sale.id',
          'sale.total',
          'ticket',
          'event.id',
          'event.name',
          'event.event_date',
          'event.hour',
          'event.poster',
          'event.geo_location',
          'event.address',
        ])
        .orderBy('event.event_date', 'DESC')
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (totalCount === 0) {
        throw new NotFoundException('No se encontraron compras');
      }

      const modifiedData = sales.map((sale) => {
        const { tickets, ...rest } = sale;
        const ticketCount = sale.tickets.length;
        return { ...rest, ticketCount };
      });

      const totalPages = Math.ceil(totalCount / limit);

      return {
        sales: modifiedData,
        currentPage: page,
        pageSize: limit,
        totalPages,
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async verifyPendingPurchase(customer: number) {
    try {
      const sale: any = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.event', 'event')
        .leftJoinAndSelect('sale.tickets', 'ticket')
        .leftJoinAndSelect('ticket.locality', 'locality')
        .where('customer.id=:customer', { customer })
        .andWhere('sale.status=:status', { status: SaleStatus.INCOMPLETE })
        .select([
          'sale',
          'ticket',
          'locality',
          'event.id',
          'event.name',
          'event.event_date',
        ])
        .getOne();
      if (!sale) return null;
      const localityTicketInfo: {
        [localityName: string]: {
          ticketCount: number;
          price: number;
          localityId: number;
        };
      } = {};

      sale.tickets.forEach((ticket) => {
        const localityName = ticket.locality.name;
        const ticketPrice = ticket.locality.price;
        const localityId = ticket.locality.id;

        if (localityTicketInfo[localityName]) {
          localityTicketInfo[localityName].ticketCount++;
        } else {
          localityTicketInfo[localityName] = {
            ticketCount: 1,
            price: ticketPrice,
            localityId: localityId,
          };
        }
      });

      // Convertir el objeto de resultados en un array de objetos
      const result = Object.entries(localityTicketInfo).map(
        ([localityName, ticketInfo]) => ({
          localityName,
          ticketCount: ticketInfo.ticketCount,
          price: ticketInfo.price,
          localityId: ticketInfo.localityId,
        }),
      );
      delete sale.tickets;
      return { sale, localities: result };
    } catch (error) {
      customError(error);
    }
  }

  async findByPromoter(id: number, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [sales, totalCount] = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('promoter.id = :id', { id })
        .select([
          'sale',
          'customer.id',
          'customer.name',
          'customer.email',
          'promoter.id',
          'promoter.name',
          'promoter.email',
        ])
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (totalCount === 0) {
        throw new NotFoundException('No se encontraron ventas');
      }

      const decryptedSales = sales.map((sale) => {
        sale.customer.name = this.encryptionService.decryptData(
          sale.customer.name,
        );
        sale.customer.email = this.encryptionService.decryptData(
          sale.customer.email,
        );
        sale.promoter.name = this.encryptionService.decryptData(
          sale.promoter.name,
        );
        sale.promoter.email = this.encryptionService.decryptData(
          sale.promoter.email,
        );
        return sale;
      });

      const totalPages = Math.ceil(totalCount / limit);

      return {
        sales: decryptedSales,
        currentPage: page,
        pageSize: limit,
        totalPages,
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async uploadVoucher(id: number, user: User, uploadPhoto: UploadPhotoDto) {
    try {
      const event = await this.eventService.findOne(uploadPhoto.event);
      let img = await this.firebaseService.uploadBase64({
        route: `${user.id} - ${user.name}/voucher/${event.name}`,
        image: uploadPhoto.photo,
      });

      const sale = await this.findOne(id);
      if (sale.transfer_photo)
        await this.firebaseService.deleteImageByUrl(sale.transfer_photo);

      sale.transfer_photo = img.imageUrl;
      return await this.saleRepository.save(sale);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
