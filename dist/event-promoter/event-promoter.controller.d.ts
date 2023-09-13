import { EventPromoterService } from './event-promoter.service';
import { CreateEventPromoterDto } from './dto/create-event-promoter.dto';
import { UpdateEventPromoterDto } from './dto/update-event-promoter.dto';
export declare class EventPromoterController {
    private readonly eventPromoterService;
    constructor(eventPromoterService: EventPromoterService);
    create(createEventPromoterDto: CreateEventPromoterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEventPromoterDto: UpdateEventPromoterDto): string;
    remove(id: string): string;
}
