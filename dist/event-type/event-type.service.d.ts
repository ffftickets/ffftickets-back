import { Logger } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { EventType } from './entities/event-type.entity';
import { Repository } from 'typeorm';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
export declare class EventTypeService {
    private readonly eventTypeRepository;
    logger: Logger;
    constructor(eventTypeRepository: Repository<EventType>);
    createSeed(createEventTypeDto: CreateEventTypeDto[]): Promise<(CreateEventTypeDto & EventType)[]>;
    findAll(): Promise<EventType[]>;
    findOne(id: number): Promise<EventType>;
    update(id: number, updateEventTypeDto: UpdateEventTypeDto): Promise<EventType>;
    delete(id: number): Promise<EventType>;
}
