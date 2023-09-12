import { BaseEntity } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
export declare class EventType extends BaseEntity {
    id: number;
    name: string;
    isActive: boolean;
    event: Event;
    createdAt: Date;
    updatedAt: Date;
    eventTypeExist(): Promise<void>;
}
