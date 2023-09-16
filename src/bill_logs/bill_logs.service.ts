import { Injectable } from '@nestjs/common';
import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';

@Injectable()
export class BillLogsService {
  create(createBillLogDto: CreateBillLogDto) {
    return 'This action adds a new billLog';
  }

  findAll() {
    return `This action returns all billLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billLog`;
  }

  update(id: number, updateBillLogDto: UpdateBillLogDto) {
    return `This action updates a #${id} billLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} billLog`;
  }
}
