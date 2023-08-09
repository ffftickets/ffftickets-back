import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventTypeService } from 'src/event-type/event-type.service';
import { customError } from 'src/common/helpers/custom-error.helper';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventTypeService: EventTypeService,
    private readonly firebaseService: FirebaseService,
    private readonly encryptionService:EncryptionService
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
  
  

  async findOne(id: number) {
    try {
      const event = await this.eventRepository
        .createQueryBuilder('event')
        .innerJoin('event.user', 'user')
        .where('event.id = :id', { id })
        .select(['event', 'user.id', 'user.name'])
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
  console.log(id)
      const [events, totalCount] = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
        .where('event.user = :id', { id })
        .select(['event', 'user.id', 'user.name'])
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

      if (event.poster === url) {
        event.poster = null;
      }
      if (event.courtesy_ticket === url) {
        event.courtesy_ticket = null;
      }

      event.event_gallery = event.event_gallery.filter(
        (element) => element !== url,
      );
      event.informative_gallery = event.informative_gallery.filter(
        (element) => element !== url,
      );

      await this.firebaseService.deleteImageByUrl(url);
      return this.eventRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
