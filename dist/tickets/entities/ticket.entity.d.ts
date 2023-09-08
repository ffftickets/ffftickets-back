import { Localities } from 'src/localities/entities/localities.entity';
import { Sale } from 'src/sales/entities/sale.entity';
export declare class Ticket {
    length: any;
    reduce(arg0: (acc: any, ticket: any) => any, arg1: {}): void;
    id: number;
    sale: Sale;
    locality: Localities;
    status: string;
    qr: string;
    createdAt: Date;
    updatedAt: Date;
    map: any;
}
