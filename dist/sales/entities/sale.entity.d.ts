import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { BillsFff } from 'src/bills_fff/entities/bills_fff.entity';
export declare class Sale {
    id: number;
    event: Event;
    promoter: User;
    customer: any;
    payType: string;
    status: string;
    authorizationNumber?: string;
    transactionCode?: string;
    transfer_photo?: string;
    serviceValue: number;
    catwalkCommission?: number;
    promoterDiscount: number;
    total: number;
    tickets: Ticket;
    authorization_date: Date;
    createdAt: Date;
    updatedAt: Date;
    bill: BillsFff;
}
