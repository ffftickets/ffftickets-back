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
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const verifyExist =  await this.verifyPendingPurchase(createSaleDto.customer.id);
      if (verifyExist)
        throw new ConflictException('Tu pedido no se pudo completar ya que actualmente tienes pedidos pendientes de validación.');

      const event = await this.eventService.findOne(createSaleDto.event);
      createSaleDto.event = event;

      const { tickets, ...createSale } = createSaleDto;

      for (const element of tickets) {
        element.locality = await this.localitiesService.findOne(
          element.locality,
        );
        if (
          element.locality.capacity <=
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

  async findAll() {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .leftJoin('sale.promoter', 'promoter')
        .select(['sale', 'customer', 'promoter'])
        .where('promoter.id IS NOT NULL OR promoter.id IS NULL')
        .getMany();
      if (sales.length === 0)
        throw new NotFoundException('No se encuentran ventas');
      return sales;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOne(id: number) {
    try {
      const sale = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .leftJoin('sale.promoter', 'promoter')
        .where('promoter.id IS NOT NULL OR promoter.id IS NULL')
        .andWhere('sale.id=:id', { id })
        .select(['sale', 'customer', 'promoter'])
        .getOne();
      if (!sale) throw new NotFoundException('No se encontró la venta');

      return sale;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findByCustomer(id: number) {
    try {
      const sales: any = await this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin('sale.customer', 'customer')
      .innerJoin('sale.event', 'event')
      .leftJoinAndSelect('sale.tickets', 'ticket')
      .leftJoinAndSelect('ticket.locality', 'locality')
      .where('customer.id=:customer', { customer:id })
      .andWhere('sale.status=:status', { status: SaleStatus.SOLD })
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
          'event.address'
      ])
      .getMany();
      if(sales.length===0) throw new NotFoundException('No se encontraron compras')
      const modifiedData = sales.map((sale) => {
        const { tickets, ...rest } = sale;
        const ticketCount = sale.tickets.length;
        return { ...rest, ticketCount };
      });
      return modifiedData;
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

  async findByPromoter(id: number) {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')

        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('promoter.id=:id', { id })
        .select(['sale', 'customer', 'promoter'])
        .getMany();
      if (!sales) throw new NotFoundException('No se encontró la venta');

      return sales;
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
      sale.transfer_photo = img.imageUrl;
      return await this.saleRepository.save(sale);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
