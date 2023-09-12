import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSaleService } from './log-sale.service';
import { LogSaleSchema } from './entities/log-sale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LogSale', schema: LogSaleSchema }]), // Configura el modelo y el esquema de MongoDB
  ],
  providers: [LogSaleService],
  exports: [LogSaleService],
})
export class LogSaleModule {}
