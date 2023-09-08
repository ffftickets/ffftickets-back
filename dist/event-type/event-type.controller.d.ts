import { Logger } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { Response } from 'express';
export declare class EventTypeController {
    private readonly eventTypeService;
    constructor(eventTypeService: EventTypeService);
    logger: Logger;
    create(res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateEventTypeDto: UpdateEventTypeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Response<any, Record<string, any>>;
}
