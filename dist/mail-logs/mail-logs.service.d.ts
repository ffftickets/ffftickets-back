import { Logger } from '@nestjs/common';
import { CreateMailLogDto } from './dto/create-mail-log.dto';
import { MailLog } from './entities/mail-log.entity';
import { Repository } from 'typeorm';
export declare class MailLogsService {
    private readonly mailLogRepository;
    logger: Logger;
    constructor(mailLogRepository: Repository<MailLog>);
    create(mailLog: CreateMailLogDto): Promise<MailLog>;
}
