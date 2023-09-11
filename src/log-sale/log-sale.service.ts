import { Injectable, Logger } from '@nestjs/common';
import { CreateLogSaleDto } from './dto/create-log-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogSale } from './entities/log-sale.entity';
import { customError } from 'src/common/helpers/custom-error.helper';


@Injectable()
export class LogSaleService {
  logger = new Logger(LogSaleService.name);

  constructor(
    @InjectRepository(LogSale)
    private readonly logSaleRepository: Repository<LogSale>,
  ) {}
  create(createLogSaleDto: CreateLogSaleDto) {
    try {

      const data = this.logSaleRepository.create(createLogSaleDto);
      return this.logSaleRepository.save(data);
    }catch(error){  
      this.logger.error("Error log venta ",error);
      customError(error);
    }
  
  }
}