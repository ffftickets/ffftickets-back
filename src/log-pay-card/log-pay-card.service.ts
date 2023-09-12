import { Injectable, Logger } from '@nestjs/common';
import { CreateLogPayCardDto } from './dto/create-log-pay-card.dto';
import { InjectModel } from '@nestjs/mongoose'; // Importa InjectModel de @nestjs/mongoose
import { Model } from 'mongoose'; // Importa Model de mongoose

import { customError } from 'src/common/helpers/custom-error.helper';
import { CreateLogPayCard } from './entities/log-pay-card.entity';

@Injectable()
export class LogPayCardService {
  logger = new Logger(LogPayCardService.name);

  constructor(
    @InjectModel('CreateLogPayCard') // Inyecta el modelo de MongoDB
    private readonly logPayCardModel: Model<CreateLogPayCard>,
  ) {}

  async create(createLogPayCardDto: CreateLogPayCardDto) {
    try {
      this.logger.log('Creando registro de pago de tarjeta');
      const createdLog = new this.logPayCardModel(createLogPayCardDto); // Crea una instancia del modelo
      return await createdLog.save(); // Guarda el registro en MongoDB y devuelve la promesa
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
