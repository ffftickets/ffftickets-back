import { BillLogsService } from './bill_logs.service';
import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';
export declare class BillLogsController {
    private readonly billLogsService;
    constructor(billLogsService: BillLogsService);
    create(createBillLogDto: CreateBillLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBillLogDto: UpdateBillLogDto): string;
    remove(id: string): string;
}
