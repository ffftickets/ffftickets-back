import {
  BadRequestException,
  Delete,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { v4 as uuidv4 } from 'uuid';
import { TicketStatus } from './enum/ticket-status.enum';
import { customError } from 'src/common/helpers/custom-error.helper';
import { SaleStatus } from 'src/sales/enum/sale-status.enum';
import { FreeTicketsService } from 'src/free-tickets/free-tickets.service';
@Injectable()
export class TicketsService {
  logger = new Logger(TicketsService.name);
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly localitiesService: LocalitiesService,
    private readonly freeTicketService: FreeTicketsService,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    try {
      const tickets = [];

      for (const element of createTicketDto.detail) {
        for (let i = 0; i < element.quantity; i++) {
          const ticket = {
            sale: createTicketDto.sale,
            qr: await uuidv4(),
            locality:element.locality,
            status: TicketStatus.ACTIVE,
          };
          const data = await this.ticketRepository.create(ticket);
          const newTicket = await this.ticketRepository.save(data);
          delete newTicket.locality.event;
          newTicket.sale = createTicketDto.sale.id;
          tickets.push(newTicket);
        }
     
        this.localitiesService.updateSold(
          element.locality.id,
          element.locality.sold + element.quantity
        );
      }

      return tickets;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll() {
    try {
      const tickets = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.sale', 'sale')
        .innerJoin('sale.event', 'event')
        .select(['ticket', 'localities', 'sale', 'event'])
        .getMany();
      if (tickets.length === 0)
        throw new NotFoundException('No se encontraron tickets');
      return tickets;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOne(id: number) {
    try {
      const ticket = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.sale', 'sale')
        .innerJoin('sale.event', 'event')
        .select(['ticket', 'localities', 'sale', 'event'])
        .where('ticket.id=:id', { id })
        .getOne();
      if (!ticket) throw new NotFoundException('El ticket no existe');
      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async findOneByQR(qr: string) {
    try {
      const ticket = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.sale', 'sale')
        .innerJoin('sale.event', 'event')
        .select(['ticket', 'localities', 'sale', 'event'])
        .where('ticket.qr=:qr', { qr })
        .getOne();

      if (!ticket) {
        const data = await this.freeTicketService.findOneByQr(qr);
        return data;
      }

      if (ticket.status === TicketStatus.SCAN)
        throw new BadRequestException('El ticket ya a sido scaneado');

      if (ticket.sale.status != SaleStatus.SOLD)
        throw new BadRequestException('La venta no a sido completada');

      ticket.status = TicketStatus.SCAN;
      this.ticketRepository.save(ticket);

      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findBySale(id: number) {
    try {
      const ticket = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.sale', 'sale')
        .where('sale.id = :id', { id }) 
        .select(['ticket', 'localities'])
        .getMany();

      if (!ticket) throw new NotFoundException('El ticket no existe');
      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findByCustomer(id: number) {
    try {
      const ticket = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.sale', 'sale')
        .innerJoin('sale.event', 'event')
        .select(['ticket', 'localities', 'sale', 'event'])
        .getMany();

      if (!ticket) throw new NotFoundException('El ticket no existe');
      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
