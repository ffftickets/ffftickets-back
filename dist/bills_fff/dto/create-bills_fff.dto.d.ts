import { StatusBill } from '../enums/status-bill.dto';
export declare class CreateBillsFffDto {
    name: string;
    identification: string;
    address: string;
    phone: string;
    email: string;
    total_o?: number;
    iva_o?: number;
    total_fff?: number;
    iva_fff?: number;
    total?: number;
    status?: StatusBill;
    sale?: any;
}
