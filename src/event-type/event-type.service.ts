import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/user/dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventType)
    private readonly userRepository: Repository<EventType>,
  ) {}
  async createSeed(createEventTypeDto: CreateEventTypeDto[]) {
    const seed = this.userRepository.create(createEventTypeDto);
    return await this.userRepository.save(createEventTypeDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    return await this.userRepository.update(id, {
      isActive: updateEventTypeDto.isActive,
      name: updateEventTypeDto.name,
    });
  }

  async delete(id: number) {
    return await this.userRepository.update(id, {
      isActive: false,
    });
  }
}
