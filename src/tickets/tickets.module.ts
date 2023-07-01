import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
