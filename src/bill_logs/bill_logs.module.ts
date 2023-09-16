import { Module } from '@nestjs/common';
import { BillLogsService } from './bill_logs.service';
import { BillLogsController } from './bill_logs.controller';

@Module({
  controllers: [BillLogsController],
  providers: [BillLogsService]
})
export class BillLogsModule {}
