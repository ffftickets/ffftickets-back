import { Logger } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { FreeTicketsService } from 'src/free-tickets/free-tickets.service';
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly localitiesService;
    private readonly freeTicketService;
    logger: Logger;
    constructor(ticketRepository: Repository<Ticket>, localitiesService: LocalitiesService, freeTicketService: FreeTicketsService);
    create(createTicketDto: CreateTicketDto): Promise<any[]>;
    deleteTicketsAndUpdateLocalities(ventaData: any, saleId: number): Promise<string>;
    findAll(): Promise<Ticket[]>;
    findOne(id: number): Promise<Ticket>;
    findOneByQR(qr: string): Promise<Ticket | import("../free-tickets/entities/free-ticket.entity").FreeTicket>;
    findBySale(id: number): Promise<Ticket[]>;
    findByCustomer(id: number): Promise<Ticket[]>;
    update(id: number, updateTicketDto: UpdateTicketDto): string;
    remove(id: number): string;
}
