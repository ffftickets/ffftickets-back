import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/user/dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';

@Injectable()
export class EventTypeService {
  logger = new Logger(EventTypeService.name);
  constructor(
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
  ) {}
  async createSeed(createEventTypeDto: CreateEventTypeDto[]) {
    try {
      const seed = this.eventTypeRepository.create(createEventTypeDto);
      return await this.eventTypeRepository.save(createEventTypeDto);
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findAll() {
    try {
      const events = await this.eventTypeRepository.find();
      if (!events)
        throw new NotFoundException('No se encontraron tipos de eventos');

      return events;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async findOne(id: number) {
    try {
      const eventType = await this.eventTypeRepository.findOne({ where: { id } });
      if (!eventType)
        throw new NotFoundException('No se encontró el tipo de evento');

      return eventType;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    try {
      return await this.eventTypeRepository.update(id, {
        ...updateEventTypeDto
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async delete(id: number) {
    try {
      return await this.eventTypeRepository.update(id, {
        isActive: false,
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
}
