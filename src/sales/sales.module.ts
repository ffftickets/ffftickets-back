import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { PassportModule } from '@nestjs/passport';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { LocalitiesModule } from 'src/localities/localities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventModule,
    UserModule,
    TicketsModule,
    LocalitiesModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports:[SalesService]
})
export class SalesModule {}
