import { Logger } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class EventController {
    private readonly eventService;
    private readonly firebaseService;
    constructor(eventService: EventService, firebaseService: FirebaseService);
    logger: Logger;
    create(createEventDto: CreateEventDto, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    findAllForAdmin(res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findEventsByOrganizer(organizer: number, res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    findEventsByUser(user: User, res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateEventDto: UpdateEventDto, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteImgEvent(id: string, url: string, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
