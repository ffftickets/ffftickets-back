import { Injectable, Logger } from '@nestjs/common';
import { CreateLogPayCardDto } from './dto/create-log-pay-card.dto';
import { UpdateLogPayCardDto } from './dto/update-log-pay-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogPayCard } from './entities/log-pay-card.entity';
import { Repository } from 'typeorm';
import { customError } from 'src/common/helpers/custom-error.helper';

@Injectable()
export class LogPayCardService {
  logger = new Logger(LogPayCardService.name);

  constructor(
    @InjectRepository(CreateLogPayCard)
    private readonly logPayCardRepository: Repository<CreateLogPayCard>,
  ) {}
  async create(createLogPayCardDto: CreateLogPayCardDto) {
    try {
      this.logger.log('Creando registro de pago de tarjeta');
      return await this.logPayCardRepository.save(createLogPayCardDto);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
 
}
