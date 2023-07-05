import { Module } from '@nestjs/common';
import { EventPromoterService } from './event-promoter.service';
import { EventPromoterController } from './event-promoter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPromoter } from './entities/event-promoter.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventPromoter]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [EventPromoterController],
  providers: [EventPromoterService]
})
export class EventPromoterModule {}
