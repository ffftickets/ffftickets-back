import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { EventType } from './entities/event-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [EventTypeController],
  providers: [EventTypeService],
  exports:[EventTypeService]
})
export class EventTypeModule {}
