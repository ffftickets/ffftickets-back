import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalitiesModule } from 'src/localities/localities.module';
import { FreeTicketsModule } from 'src/free-tickets/free-tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LocalitiesModule,
    FreeTicketsModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports:[TicketsService]
})
export class TicketsModule {}
