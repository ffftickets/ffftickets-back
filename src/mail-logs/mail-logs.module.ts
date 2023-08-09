import { Module } from '@nestjs/common';
import { MailLogsService } from './mail-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailLog } from './entities/mail-log.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MailLog]),
  ],
  providers: [MailLogsService],
  exports :[MailLogsService]  
}) 
export class MailLogsModule {}
