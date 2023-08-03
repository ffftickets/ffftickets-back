import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFreeTicketDto } from './dto/create-free-ticket.dto';
import { UpdateFreeTicketDto } from './dto/update-free-ticket.dto';
import { FreeTicket } from './entities/free-ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { customError } from 'src/common/helpers/custom-error.helper';
import { TicketStatus } from './enum/ticket-status.enum';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class FreeTicketsService {
  constructor(
    @InjectRepository(FreeTicket)
    private readonly freeTicketRepository: Repository<FreeTicket>,
    private readonly localitiesService: LocalitiesService,
    private readonly userService: UserService,
  ) {}
  logger = new Logger(FreeTicketsService.name);
  async findByUser(user: number) {
    try {
      const tickets = await this.freeTicketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.user', 'user')
        .innerJoin('localities.event', 'event')
        .select(['ticket', 'localities', 'user', 'event.name', 'event.id'])
        .where('ticket.user=:user', { user })
        .getMany();

      if (tickets.length === 0)
        throw new NotFoundException('No se encontraron tickets del usuario');

      return tickets;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async create(createFreeTicketDto: CreateFreeTicketDto) {
    try {
      const locality = await this.localitiesService.findOne(
        createFreeTicketDto.locality,
      );
      if (locality.sold >= locality.capacity)
        throw new BadRequestException('No se encuentran entradas disponibles');
      if (locality.price !== 0)
        throw new BadRequestException('La entrada no es gratuita');

      createFreeTicketDto.locality = locality;
      const data = await this.freeTicketRepository.create({
        ...createFreeTicketDto,
        qr: uuidv4(),
      });
      const newTicket = await this.freeTicketRepository.save(data);
      this.localitiesService.updateSold(locality.id, locality.sold + 1);

      return newTicket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll() {
    try {
      const tickets = await this.freeTicketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.user', 'user')
        .innerJoin('localities.event', 'event')
        .select(['ticket', 'localities', 'user', 'event'])
        .getMany();
      if (tickets.length === 0)
        throw new NotFoundException('No se encontraron tickets');
      return tickets;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOneByQr(qr: string) {
    try {
      const ticket = await this.freeTicketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.user', 'user')
        .innerJoin('localities.event', 'event')
        .select(['ticket', 'localities', 'user', 'event.name', 'event.id'])
        .where('ticket.qr=:qr', { qr })
        .getOne();
      if (!ticket) throw new NotFoundException('El ticket no existe');
      if (ticket.status === TicketStatus.SCAN)
        throw new BadRequestException('El ticket ya a sido scaneado');

      ticket.status = TicketStatus.SCAN;
      this.freeTicketRepository.save(ticket);

      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async verifyTicketExist(user: User, locality: number) {
    try {
      const userId = user.id;
      const ticket = await this.freeTicketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.locality', 'localities')
        .innerJoin('ticket.user', 'user')
        .innerJoin('localities.event', 'event')
        .select(['ticket', 'localities', 'user', 'event'  ])
        .where('user.id=:userId', { userId })
        .andWhere('localities.id=:locality', { locality })
        .getOne();

      if (!ticket) {
        return await this.create({
          locality,
          user,
        });
      }
      return ticket;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
