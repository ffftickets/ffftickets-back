import { DetailTicket } from 'src/tickets/dto/create-ticket.dto';
import { CreateBillsFffDto } from 'src/bills_fff/dto/create-bills_fff.dto';
export declare class CreateSaleDto {
    event: any;
    promoter?: any;
    customer?: any;
    payType: string;
    status: string;
    authorizationNumber?: string;
    transactionCode?: string;
    transfer_photo?: string;
    serviceValue?: number;
    promoterDiscount?: number;
    catwalkCommission?: number;
    total?: number;
    tickets?: DetailTicket[];
    bill: CreateBillsFffDto;
}
