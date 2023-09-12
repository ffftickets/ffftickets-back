import { Logger } from '@nestjs/common';
import { CreateMailLogDto } from './dto/create-mail-log.dto';
import { Model } from 'mongoose';
import { MailLog } from './entities/mail-log.entity';
export declare class MailLogsService {
    private readonly mailLogModel;
    logger: Logger;
    constructor(mailLogModel: Model<MailLog>);
    create(mailLog: CreateMailLogDto): Promise<MailLog>;
}
