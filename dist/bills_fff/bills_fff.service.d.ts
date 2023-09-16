import { Logger } from '@nestjs/common';
import { CreateBillsFffDto } from './dto/create-bills_fff.dto';
import { BillsFff } from './entities/bills_fff.entity';
import { Repository } from 'typeorm';
import { StatusBill } from './enums/status-bill.dto';
export declare class BillsFffService {
    private readonly billRepository;
    logger: Logger;
    constructor(billRepository: Repository<BillsFff>);
    create(createBillsFffDto: CreateBillsFffDto): Promise<BillsFff>;
    findAll(page?: number, limit?: number): Promise<{
        bills: BillsFff[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    findOne(id: number): string;
    update(sale: number, status: StatusBill): Promise<BillsFff>;
    remove(id: number): string;
}
