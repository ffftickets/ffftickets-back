import { StatusBill } from '../enums/status-bill.dto';
import { Sale } from 'src/sales/entities/sale.entity';
export declare class BillsFff {
    id: number;
    sale: Sale;
    name: string;
    identification: string;
    address: string;
    phone: string;
    email: string;
    total_o: number;
    iva_o: number;
    total_fff: number;
    iva_fff: number;
    total: number;
    status: StatusBill;
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
