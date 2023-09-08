import { Logger } from '@nestjs/common';
import { FreeTicketsService } from './free-tickets.service';
import { CreateFreeTicketDto } from './dto/create-free-ticket.dto';
import { User } from 'src/user/entities/user.entity';
export declare class FreeTicketsController {
    private readonly freeTicketsService;
    constructor(freeTicketsService: FreeTicketsService);
    logger: Logger;
    create(createFreeTicketDto: CreateFreeTicketDto, user: User): Promise<import("./entities/free-ticket.entity").FreeTicket>;
    findAll(): Promise<import("./entities/free-ticket.entity").FreeTicket[]>;
    findOne(qr: string): Promise<import("./entities/free-ticket.entity").FreeTicket>;
    findByUser(user: User): Promise<import("./entities/free-ticket.entity").FreeTicket[]>;
    verifyTicketExist(location: number, user: User): Promise<import("./entities/free-ticket.entity").FreeTicket>;
}
