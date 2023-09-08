import { CreateEventPromoterDto } from './dto/create-event-promoter.dto';
import { UpdateEventPromoterDto } from './dto/update-event-promoter.dto';
export declare class EventPromoterService {
    create(createEventPromoterDto: CreateEventPromoterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEventPromoterDto: UpdateEventPromoterDto): string;
    remove(id: number): string;
}
