import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
