import { Logger } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { FreeTicketsService } from 'src/free-tickets/free-tickets.service';
import { EncryptionService } from 'src/encryption/encryption.service';
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly localitiesService;
    private readonly freeTicketService;
    private readonly encryptionService;
    logger: Logger;
    constructor(ticketRepository: Repository<Ticket>, localitiesService: LocalitiesService, freeTicketService: FreeTicketsService, encryptionService: EncryptionService);
    create(createTicketDto: CreateTicketDto): Promise<any[]>;
    deleteTicketsAndUpdateLocalities(ventaData: any, saleId: number): Promise<string>;
    findAll(): Promise<Ticket[]>;
    findOne(id: number): Promise<Ticket>;
    findOneByQR(qr: string): Promise<import("../free-tickets/entities/free-ticket.entity").FreeTicket | Ticket>;
    findBySale(id: number): Promise<{
        qr: string;
        length: any;
        id: number;
        sale: import("../sales/entities/sale.entity").Sale;
        locality: import("../localities/entities/localities.entity").Localities;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        map: any;
    }[]>;
    findByCustomer(id: number): Promise<Ticket[]>;
    update(id: number, updateTicketDto: UpdateTicketDto): string;
    remove(id: number): string;
}
