import { Module } from '@nestjs/common';
import { BillsFffService } from './bills_fff.service';
import { BillsFffController } from './bills_fff.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsFff } from './entities/bills_fff.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([BillsFff]),

  ],
  controllers: [BillsFffController],
  providers: [BillsFffService],
  exports:[BillsFffService] 
})
export class BillsFffModule {}
