import { Module } from '@nestjs/common';
import { LogPayCardService } from './log-pay-card.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateLogPayCard } from './entities/log-pay-card.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([CreateLogPayCard]),],
  providers: [LogPayCardService],
  exports:[LogPayCardService]
})
export class LogPayCardModule {}
