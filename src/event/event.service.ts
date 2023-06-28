import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventTypeService } from 'src/event-type/event-type.service';
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventTypeService: EventTypeService,
  ) {}
  logger = new Logger(EventService.name);
  async create(createEventDto: CreateEventDto) {
    try {
      const eventType = await this.eventTypeService.findOne(
        createEventDto.event_type,
      );
      createEventDto.event_type = eventType;
      const event = await this.eventRepository.create(createEventDto);
      return await this.eventRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  findAll() {
    try {
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findOne(id: number) {
    try {

      const event = await this.eventRepository.findOne({ where: { id } });
      if (!event) throw new NotFoundException('No se encontró el evento');

      return event;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      await  this.eventRepository.update(id,{...updateEventDto});
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  remove(id: number) {
    try {
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
}
