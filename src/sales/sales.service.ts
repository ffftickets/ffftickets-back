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
import { SaleStatus } from './enum/sale-status.enum';
import { User } from 'src/user/entities/user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PayTypes } from './enum/pay-types.enum';
import { UpdateSaleCard } from './dto/update-sale-card';
import { LogPayCardService } from 'src/log-pay-card/log-pay-card.service';
import { MailService } from 'src/mail/mail.service';
import { GenerateOrderDto, TicketsEmailDto } from 'src/mail/dto';
import { CreateLogSaleDto } from 'src/log-sale/dto/create-log-sale.dto';
import { LogSaleService } from 'src/log-sale/log-sale.service';
import { ActionSale } from 'src/log-sale/enum/sale-action.enum';
import { OrderCompletedDto } from 'src/mail/dto/order-completed';
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
    private readonly logPayCardService: LogPayCardService,
    private readonly mailService: MailService,
    private readonly logSaleService: LogSaleService,
  ) {}
  async create(createSaleDto: CreateSaleDto, logSale: CreateLogSaleDto) {
    try {
      const { tickets, ...createSale } = createSaleDto;
      //!Obtener el evento
      const event = await this.eventService.findOne(createSaleDto.event);
      createSaleDto.event = event;
      //! Calcular el valor del servicio.
     
      createSale.serviceValue = this.calculateServiceValue(tickets,event.commission);
      //? Verificar si el usuario tiene pedidos pendientes de validación
      const verifyExist = await this.verifyPendingPurchase(
        createSale.customer.id,
      );

        console.log("Tiene compras pendientes",verifyExist ? 'Si' : 'No');
      //?En caso de que tenga una compra pendiente entra a validación!
      if (verifyExist) {
        //! Si tiene pedidos pendientes de validación con transferencia y no a subido un comprobante se elimina la compra anterior y se crea una nueva.
        //! Si tiene pedidos pendientes de validación con transferencia y ya subió un comprobante se emite el mensaje de que tiene compras pendientes.
        if (verifyExist.sale.payType === PayTypes.TRANSFER && createSale.payType === PayTypes.TRANSFER) {
            throw new ConflictException(
              'Tu pedido no se pudo completar ya que actualmente tienes pedidos pendientes de validación.',
            );
        } else {
          //! Si tiene pedidos pendientes de validación con tarjeta se elimina la compra anterior y se crea una nueva.
          console.log("Cancelando compra anterior");
          logSale.action = ActionSale.CANCEL; 
          logSale.data = verifyExist;
          this.logSaleService.create(logSale);
          await this.deleteSaleAndTickets(verifyExist);

        }
      }

      let localityDataToEmail = [];
      let totalLocalities = 0;
      for (const element of tickets) {
        element.locality = await this.localitiesService.findOne(
          element.locality,
        );
        localityDataToEmail.push({
          name: element.locality.name,
          quantity: element.quantity,
          price: element.locality.total,
        })
        totalLocalities += element.locality.total*element.quantity;
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

      if (createSale.promoter) {
        const promoter = await this.userService.findOne({
          id: createSaleDto.promoter,
        });
        createSale.promoter = promoter;
      }

      createSale.total = createSale.serviceValue + totalLocalities;

    

      const sale = await this.saleRepository.create(createSale);
      const newSale = await this.saleRepository.save(sale);
      const newTickets = await this.ticketService.create({
        sale: newSale,
        detail: tickets,
      });
      logSale.action = ActionSale.CREATE;
      logSale.data = {newSale,newTickets};
      this.logSaleService.create(logSale);
      if(createSale.payType === PayTypes.TRANSFER){
      const dataOrderGeneratedEmail:GenerateOrderDto = {
        email: sale.customer.email,
        event: event.name,
        subtotal: totalLocalities,
        serviceValue: sale.serviceValue,
        total: sale.total,
        order: sale.id,
        localities: [...localityDataToEmail]
      }
      this.mailService.sendOrderGeneratedEmail(dataOrderGeneratedEmail);
    }
     
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
  async deleteSaleAndTickets(saleDelete: any) {
    
    const { localities, sale } = saleDelete;
    
   

    for (const locality of localities) {
      await this.ticketService.deleteTicketsAndUpdateLocalities(locality,sale.id);
    }
    console.log("Eliminando venta",sale.id)
    await this.saleRepository.update(sale.id, { status: SaleStatus.CANCELED })
  }
  calculateServiceValue(tickets: any[],commission:number): any {
    let serviceValue = 0;
    for (const element of tickets) {
      serviceValue += element.quantity;
    }
    serviceValue = serviceValue * commission;
    return serviceValue + (serviceValue * 0);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    status: string,
    paymentMethod: string,
  ) {
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
        .orderBy('sale.id', 'DESC')
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

  async findAllByEvent(
    event: number,
    page: number = 1,
    limit: number = 10,
    status: string,
    paymentMethod: string,
  ) {
    try {
      const skip = (page - 1) * limit;

      const query = this.saleRepository
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
        .orderBy('sale.id', 'DESC')
        .andWhere('sale.event = :event', { event });

      // Agregar los filtros solo si status y paymentMethod son diferentes de ""
      if (status !== '') {
        query.andWhere('sale.status = :status', { status });
      }
      if (paymentMethod !== '') {
        query.andWhere('sale.payType = :paymentMethod', { paymentMethod });
      }

      const [sales, totalCount] = await query
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
        .innerJoin('sale.event', 'event')
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
          'event.id',
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
        .orderBy('sale.id', 'DESC')
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
          'event.commission'
        ])
        .getOne();
      if (!sale) return null;

      const localityTicketInfo: {
        [localityName: string]: {
          ticketCount: number;
          price: number;
          localityId: number;
          total: number;
        };
      } = {};

      sale.tickets.forEach((ticket) => {
        const localityName = ticket.locality.name;
        const ticketPrice = ticket.locality.price;
        const localityId = ticket.locality.id;
        const total = ticket.locality.total;
        if (localityTicketInfo[localityName]) {
          localityTicketInfo[localityName].ticketCount++;
        } else {
          localityTicketInfo[localityName] = {
            ticketCount: 1,
            price: ticketPrice,
            localityId: localityId,
            total:total
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
          total: ticketInfo.total
        }),
      );
      delete sale.tickets;
      return { sale, localities: result };
    } catch (error) {
      customError(error);
    }
  }

  
  async verifyInfoSaleWIthLocalities(saleId:number) {
    try {
      const sale: any = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.event', 'event')
        .innerJoin('sale.customer', 'user')
        .leftJoinAndSelect('sale.tickets', 'ticket')
        .leftJoinAndSelect('ticket.locality', 'locality')
        .where('sale.id=:saleId', { saleId })
        .select([
          'sale',
          'ticket',
          'locality',
          'event.id',
          'event.name',
          'event.event_date',
          'event.commission',
          'user.name',
          'user.email',
          'user.phone',
          'user.identification',
        ])
        .getOne();
      if (!sale) return null;

      const localityTicketInfo: {
        [localityName: string]: {
          ticketCount: number;
          price: number;
          localityId: number;
          total: number;
        };
      } = {};

      sale.tickets.forEach((ticket) => {
        const localityName = ticket.locality.name;
        const ticketPrice = ticket.locality.price;
        const localityId = ticket.locality.id;
        const total = ticket.locality.total;
        if (localityTicketInfo[localityName]) {
          localityTicketInfo[localityName].ticketCount++;
        } else {
          localityTicketInfo[localityName] = {
            ticketCount: 1,
            price: ticketPrice,
            localityId: localityId,
            total:total
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
          total: ticketInfo.total
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
  async validateSaleAdmin(id: number) {
    try {
      const sale = await this.findOne(id);
      sale.status = SaleStatus.SOLD;
      const data =  await this.saleRepository.save(sale);
      this.generateDataToEmailCompleteOrder(id);
      this.generateDataToEmailTickets(id);
      return data;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  //TODO:Cambiar esto en base a la pasarela de pago
  async updateSaleWIthCard(id:number,updateSaleCard:UpdateSaleCard){
    try {
      const sale = await this.findOne(id);
      updateSaleCard.log.sale = sale;
      const {log, ...updateData} = updateSaleCard;
      this.logPayCardService.create(log);
      sale.status = SaleStatus.SOLD;
      sale.authorizationNumber = updateData.authorizationNumber;
      sale.transactionCode = updateData.transactionCode;
      sale.catwalkCommission = updateData.catwalkCommission;
      const dataSale =  await this.saleRepository.save(sale);
      
      this.generateDataToEmailCompleteOrder(id);
      this.generateDataToEmailTickets(id);
      return 'Venta actualizada con éxito';
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }

  }
   transformTicketsToLocalities(tickets) {
    const localityMap = {};
  
    for (const ticket of tickets) {
      const localityName = ticket.locality.name;
      const qr = ticket.qr;
  
      if (!localityMap[localityName]) {
        localityMap[localityName] = {
          localityName: localityName,
          qrs: [qr],
        };
      } else {
        localityMap[localityName].qrs.push(qr);
      }
    }
  
    return Object.values(localityMap);
  }
  
  async generateDataToEmailCompleteOrder(id:number){
    const data:any = await this.verifyInfoSaleWIthLocalities(id);
    console.log(data)
    let totalLocalidades = 0;
    data.localities.forEach(element => {
      totalLocalidades += parseFloat((element.total * element.ticketCount).toFixed(2));
    })
    const newLocalities = data.localities.map((locality) => ({
      name: locality.localityName,
      price: parseFloat(locality.total), // Convertir a número si es necesario
      quantity: locality.ticketCount
    }));

    const payTypeToPayNameMap = {
      [PayTypes.TRANSFER]: 'Transferencia',
      [PayTypes.CREDIT_CARD]: 'Tarjeta',
      [PayTypes.DEBIT_CARD]: 'Tarjeta',
      [PayTypes.PAY_PHONE]: 'Pago por celular',
    };
    
    const PayName = payTypeToPayNameMap[data.sale.payType] || 'Método no especificado';
    const payNumber = data.sale.authorizationNumber || null;
    
    

    const dataEmail:OrderCompletedDto={
      order: data.sale.id,
      email: this.encryptionService.decryptData(data.sale.customer.email),
      event: data.sale.event.name,
      subtotal: totalLocalidades,
      serviceValue: data.sale.serviceValue,
      total: data.sale.total,
      localities: [...newLocalities],
      customer: {
        name: this.encryptionService.decryptData(data.sale.customer.name),
        phone: this.encryptionService.decryptData(data.sale.customer.phone),
        ci: this.encryptionService.decryptData(data.sale.customer.identification),
        address: this.encryptionService.decryptData(data.sale.customer.address || '')
      },
      pay:{
        name: PayName,
        number: payNumber
      }
    }
    this.mailService.sendOrderCompletedEmail(dataEmail);
  }
  async generateDataToEmailTickets(idSale:number){
    const dataSale:any = await this.findOne(idSale);
    
    const dataEvent = await this.eventService.findOne(dataSale.event.id);
    const dataLocalities = await this.ticketService.findBySale(dataSale.id);

    const localities = this.transformTicketsToLocalities(dataLocalities);

     const dataSendEmail:TicketsEmailDto={
      email: dataSale.customer.email,
      name: dataSale.customer.name,
      event:{
        name: dataEvent.name,
        event_date: dataEvent.event_date,
        place: dataEvent.address,
        poster: dataEvent.poster,
        user: {name: dataEvent.user.name}
      },
      sale:{ id: dataSale.id},
      localities:[...localities]
      }

    this.mailService.sendTicketsEmail(dataSendEmail);
  }

  
}
