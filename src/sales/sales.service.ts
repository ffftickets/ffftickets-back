import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';

@Injectable()
export class SalesService {
  logger = new Logger(SalesService.name);
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly ticketService: TicketsService,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const event = await this.eventService.findOne(createSaleDto.event);
      createSaleDto.event = event;
      const organizer = await this.userService.findOne({
        id: createSaleDto.organizer,
      });
      createSaleDto.organizer = organizer;
      const customer = await this.userService.findOne({
        id: createSaleDto.customer,
      });
      createSaleDto.customer = customer;

      if (createSaleDto.promoter) {
        const promoter = await this.userService.findOne({
          id: createSaleDto.promoter,
        });
        createSaleDto.promoter = promoter;
      }

      const { tickets, ...createSale } = createSaleDto;

      const sale = await this.saleRepository.create(createSale);
      const newSale = await this.saleRepository.save(sale);

      const newTickets = await this.ticketService.create({
        sale: newSale,
        detail: tickets,
      });
      return { sale: newSale, tickets: newTickets };
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findAll() {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.organizer', 'organizer')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .select(['sale', 'organizer', 'customer', 'promoter'])
        .getMany();
      if (sales.length === 0)
        throw new NotFoundException('No se encuentran ventas');
      return sales;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findOne(id: number) {
    try {
      const sale = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.organizer', 'organizer')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('sale.id=:id', { id })
        .select(['sale', 'organizer', 'customer', 'promoter'])
        .getOne();
      if (!sale) throw new NotFoundException('No se encontró la venta');

      return sale;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findByCustomer(id: number) {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.organizer', 'organizer')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('customer.id=:id', { id })
        .select(['sale', 'organizer', 'customer', 'promoter'])
        .getMany();
      if (!sales) throw new NotFoundException('No se encontró la venta');

      return sales;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findByOrganizer(id: number) {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.organizer', 'organizer')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('organizer.id=:id', { id })
        .select(['sale', 'organizer', 'customer', 'promoter'])
        .getMany();
      if (!sales) throw new NotFoundException('No se encontró la venta');

      return sales;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }


  async findByPromoter(id: number) {
    try {
      const sales = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('sale.organizer', 'organizer')
        .innerJoin('sale.customer', 'customer')
        .innerJoin('sale.promoter', 'promoter')
        .where('promoter.id=:id', { id })
        .select(['sale', 'organizer', 'customer', 'promoter'])
        .getMany();
      if (!sales) throw new NotFoundException('No se encontró la venta');

      return sales;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }


  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
