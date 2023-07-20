import { Module } from '@nestjs/common';
import { FreeTicketsService } from './free-tickets.service';
import { FreeTicketsController } from './free-tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { FreeTicket } from './entities/free-ticket.entity';
import { LocalitiesModule } from 'src/localities/localities.module';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([FreeTicket]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    LocalitiesModule,
    EventModule
  ],
  controllers: [FreeTicketsController],
  providers: [FreeTicketsService],
  exports:[FreeTicketsService]
})
export class FreeTicketsModule {}
