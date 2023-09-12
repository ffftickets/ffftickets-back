import { Event } from 'src/event/entities/event.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { FreeTicket } from 'src/free-tickets/entities/free-ticket.entity';
export declare class Localities {
    id: number;
    event: Event;
    free_ticket: FreeTicket;
    name: string;
    price: number;
    capacity: number;
    sold: number;
    photo?: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    ticket: Ticket;
    iva: number;
    total: number;
}
