import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailLogsService } from './mail-logs.service';
import { MailLogSchema } from './entities/mail-log.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MailLog', schema: MailLogSchema }]), // Configura el modelo y el esquema de MongoDB
  ],
  providers: [MailLogsService],
  exports: [MailLogsService],
})
export class MailLogsModule {}
