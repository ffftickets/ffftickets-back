import { Logger } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Response } from 'express';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    logger: Logger;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    findByQR(qr: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findByEvent(sale: number, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateTicketDto: UpdateTicketDto): string;
    remove(id: string): string;
}
