import { Injectable, Logger } from '@nestjs/common';
import { CreateMailLogDto } from './dto/create-mail-log.dto';
import { InjectModel } from '@nestjs/mongoose'; // Importa InjectModel de @nestjs/mongoose
import { Model } from 'mongoose'; // Importa Model de mongoose
import { MailLog } from './entities/mail-log.entity';

@Injectable()
export class MailLogsService {
  logger = new Logger(MailLogsService.name);

  constructor(
    @InjectModel('MailLog') // Inyecta el modelo de MongoDB
    private readonly mailLogModel: Model<MailLog>,
  ) {}

  async create(mailLog: CreateMailLogDto): Promise<MailLog> {
    this.logger.log('Creando log: ', mailLog.receiver);
    try {
      const createdLog = new this.mailLogModel(mailLog); // Crea una instancia del modelo
      return await createdLog.save(); // Guarda el registro en MongoDB
    } catch (error) {
      this.logger.error(error);
      throw error; // Asegúrate de propagar el error después de manejarlo
    }
  }
}
