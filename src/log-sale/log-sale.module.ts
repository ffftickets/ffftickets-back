import { Module } from '@nestjs/common';
import { LogSaleService } from './log-sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogSale } from './entities/log-sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogSale]),
  ],
  providers: [LogSaleService],
  exports: [LogSaleService],
})
export class LogSaleModule {}
