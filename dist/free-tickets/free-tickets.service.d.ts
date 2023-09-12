import { Logger } from '@nestjs/common';
import { CreateFreeTicketDto } from './dto/create-free-ticket.dto';
import { FreeTicket } from './entities/free-ticket.entity';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
export declare class FreeTicketsService {
    private readonly freeTicketRepository;
    private readonly localitiesService;
    private readonly userService;
    constructor(freeTicketRepository: Repository<FreeTicket>, localitiesService: LocalitiesService, userService: UserService);
    logger: Logger;
    findByUser(user: number): Promise<FreeTicket[]>;
    create(createFreeTicketDto: CreateFreeTicketDto): Promise<FreeTicket>;
    findAll(): Promise<FreeTicket[]>;
    findOneByQr(qr: string): Promise<FreeTicket>;
    verifyTicketExist(user: User, locality: number): Promise<FreeTicket>;
}
