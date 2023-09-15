import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Event } from '../event/entities/event.entity';
import { EventTypeModule } from 'src/event-type/event-type.module';
import { AmazonS3Module } from 'src/amazon-s3/amazon-s3.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventTypeModule,
    AmazonS3Module
  ],
  controllers: [EventController],
  providers: [EventService],
  exports:[EventService]
  
})
export class EventModule {}
