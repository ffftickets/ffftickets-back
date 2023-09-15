import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventTypeService } from 'src/event-type/event-type.service';
import { customError } from 'src/common/helpers/custom-error.helper';
import { EncryptionService } from 'src/encryption/encryption.service';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventTypeService: EventTypeService,
    private readonly amazon3SService: AmazonS3Service,
    private readonly encryptionService: EncryptionService,
  ) {}
  logger = new Logger(EventService.name);
  async create(createEventDto: CreateEventDto) {
    try {
      const eventType = await this.eventTypeService.findOne(
        createEventDto.event_type,
      );
      createEventDto.event_type = eventType;
      const event = await this.eventRepository.create(createEventDto);
      delete event.user.password;
      delete event.user.roles;
      return await this.eventRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [events, totalCount] = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
        .select(['event', 'user.id', 'user.name'])
        .where('event.isActive = :isActive', { isActive: true }) // Agregar esta línea para la condición
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (totalCount === 0) {
        throw new NotFoundException('No se encontraron eventos');
      }

      const decryptedEvents = events.map((event) => {
        event.user.name = this.encryptionService.decryptData(event.user.name);
        return event;
      });

      const totalPages = Math.ceil(totalCount / limit);

      return {
        events: decryptedEvents,
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

  async findAllForAdmin(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
  
      const [events, totalCount] = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
        .leftJoinAndSelect('event.event_type', 'event-type', 'event.eventTypeId = event-type.id')
        .leftJoinAndSelect('event.sale', 'sales', 'event.id = sales.eventId') // Agregar la relación 'sale'
        .select(['event', 'user.id', 'user.name', 'event-type.name', 'sales'])
        .skip(skip)
        .take(limit)
        .getManyAndCount();
  
      if (totalCount === 0) {
        throw new NotFoundException('No se encontraron eventos');
      }
  
      const eventsWithCount = events.map((event) => {
        const sales:any = event.sale;
        const soldCount = sales.filter((sale) => sale.status === 'SOLD').length;
        const incompleteCount = sales.filter((sale) => sale.status === 'INCOMPLETE').length;
  
        // Eliminar la propiedad 'sale'
        delete event.sale;
  
        return {
          ...event,
          soldCount,
          incompleteCount,
        };
      });
  
      const decryptedEvents = eventsWithCount.map((event) => {
        event.user.name = this.encryptionService.decryptData(event.user.name);
        return event;
      });
  
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        events: decryptedEvents,
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
      const event = await this.eventRepository
        .createQueryBuilder('event')
        .innerJoin('event.user', 'user')
        .leftJoinAndSelect(
          'event.event_type',
          'event-type',
          'event.eventTypeId = event-type.id',
        )
        .where('event.id = :id', { id })
        .select([
          'event',
          'user.id',
          'user.name',
          'event-type.id',
          'event-type.name',
        ])
        .getOne();
      if (!event) throw new NotFoundException('No se encontró el evento');
      event.user.name = this.encryptionService.decryptData(event.user.name);
      return event;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findEventsByUser(id: number, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [events, totalCount] = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
        .leftJoinAndSelect(
          'event.event_type',
          'event-type',
          'event.eventTypeId = event-type.id',
        )
        .where('event.user = :id', { id })
        .select([
          'event',
          'user.id',
          'user.name',
          'event-type.id',
          'event-type.name',
        ])
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (totalCount === 0) {
        throw new NotFoundException('No se encontraron eventos');
      }

      const decryptedEvents = events.map((event) => {
        event.user.name = this.encryptionService.decryptData(event.user.name);
        return event;
      });

      const totalPages = Math.ceil(totalCount / limit);

      return {
        events: decryptedEvents,
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

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      console.log(updateEventDto);
      await this.eventRepository.update(id, { ...updateEventDto });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.eventRepository.update(id, { isActive: false });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async deleteImgEvent(id: number, url: string) {
    try {
      const event = await this.findOne(id);
      console.log(1);
      if (event.poster === url) {
        event.poster = null;
      }
      if (event.courtesy_ticket === url) {
        event.courtesy_ticket = null;
      }
      if (event.event_gallery) {
        event.event_gallery = event.event_gallery.filter(
          (element) => element !== url,
        );
      }
      if (event.informative_gallery) {
        event.informative_gallery = event.informative_gallery.filter(
          (element) => element !== url,
        );
      }

      await this.amazon3SService.deleteImageByUrl(url);
      return this.eventRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async countEventsForUser(userId: number): Promise<number> {
    const eventCount = await this.eventRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return eventCount || 0; // Devolver el eventoCount o 0 si es falsy
  }
}
