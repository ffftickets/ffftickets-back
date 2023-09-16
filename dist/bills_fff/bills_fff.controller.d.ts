import { BillsFffService } from './bills_fff.service';
import { UpdateBillsFffDto } from './dto/update-bills_fff.dto';
export declare class BillsFffController {
    private readonly billsFffService;
    constructor(billsFffService: BillsFffService);
    findAll(): Promise<{
        bills: import("./entities/bills_fff.entity").BillsFff[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateBillsFffDto: UpdateBillsFffDto): void;
    remove(id: string): string;
}
