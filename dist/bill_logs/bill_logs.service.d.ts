import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';
export declare class BillLogsService {
    create(createBillLogDto: CreateBillLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBillLogDto: UpdateBillLogDto): string;
    remove(id: number): string;
}
