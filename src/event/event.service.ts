import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventTypeService } from 'src/event-type/event-type.service';
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventTypeService: EventTypeService,
    private readonly firebaseService: FirebaseService,
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
      handleDbError(error);
    }
  }

  async findAll() {
    try {
      const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
    
      .select(['event','user.id','user.name'])
      .getMany();
      if (!events) throw new NotFoundException('No se encontraron eventos');
      return events;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
      .where('event.id = :id', { id })
      .select(['event','user.id','user.name'])
      .getOne();
      if (!event) throw new NotFoundException('No se encontró el evento');
      return event;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async findEventsByUser(id: number) {
    try {
      const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
      .where('event.user = :id', { id })
      .select(['event','user.id','user.name'])
      .getMany();
      if (!event || event.length===0) throw new NotFoundException('No se encontraron eventos');
      return event;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async 

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      await this.eventRepository.update(id, { ...updateEventDto });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.eventRepository.update(id,{isActive:false});
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
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
      handleDbError(error);
    }
  }
}
