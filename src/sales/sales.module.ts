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
import { LogPayCardModule } from 'src/log-pay-card/log-pay-card.module';
import { MailModule } from 'src/mail/mail.module';
import { LogSaleModule } from 'src/log-sale/log-sale.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventModule,
    UserModule,
    TicketsModule,
    LocalitiesModule,
    LogPayCardModule,
    MailModule,
    LogSaleModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports:[SalesService]
})
export class SalesModule {}
