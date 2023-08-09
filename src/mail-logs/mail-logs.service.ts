import { Injectable, Logger } from '@nestjs/common';
import { CreateMailLogDto } from './dto/create-mail-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MailLog } from './entities/mail-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailLogsService {
  logger = new Logger(MailLogsService.name);
  constructor(
    @InjectRepository(MailLog)
    private readonly mailLogRepository: Repository<MailLog>,
  ) {}
  async create(mailLog: CreateMailLogDto): Promise<MailLog> {
    this.logger.log('Creando log: ', mailLog.receiver);
    try {
    
      const email = await this.mailLogRepository.save(mailLog);
      return email; 
    } catch (error) {
      this.logger.error(error);
      // handleDbException(error);
      throw error; // Asegúrate de propagar el error después de manejarlo
    }
  } 
}
    