import { Injectable, Logger } from '@nestjs/common';
import { CreateLogSaleDto } from './dto/create-log-sale.dto';
import { InjectModel } from '@nestjs/mongoose'; // Importa InjectModel de @nestjs/mongoose
import { Model } from 'mongoose'; // Importa Model de mongoose
import { customError } from 'src/common/helpers/custom-error.helper';
import { LogSale } from './entities/log-sale.entity';

@Injectable()
export class LogSaleService {
  logger = new Logger(LogSaleService.name);

  constructor(
    @InjectModel('LogSale') // Inyecta el modelo de MongoDB
    private readonly logSaleModel: Model<LogSale>,
  ) {}

  async create(createLogSaleDto: CreateLogSaleDto) {
    try {
      const data = new this.logSaleModel(createLogSaleDto); // Crea una instancia del modelo
      return await data.save(); // Guarda el registro en MongoDB y devuelve la promesa
    } catch (error) {
      this.logger.error('Error log venta ', error);
      customError(error);
    }
  }
}
