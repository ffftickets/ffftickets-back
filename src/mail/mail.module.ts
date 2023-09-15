import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_SECURE, MAIL_USER } from 'src/config/config.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailLog } from 'src/mail-logs/entities/mail-log.entity';
import { MailLogsModule } from 'src/mail-logs/mail-logs.module';
import { AmazonS3Module } from 'src/amazon-s3/amazon-s3.module';
@Global()
@Module({
  imports:[
    
    MailerModule.forRootAsync({ 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get(MAIL_HOST),
          port: configService.get(MAIL_PORT),
          secure: configService.get(MAIL_SECURE),
          auth: {
            user: configService.get(MAIL_USER), 
            pass: configService.get(MAIL_PASS),
          },
        },
        defaults: {
          from: `"FFF Tickets" <${configService.get(MAIL_USER)}>`, 
        },
      }),
     
    }),
    MailLogsModule,
    AmazonS3Module
  ],
  providers: [MailService,],
  exports:[MailService]
})
export class MailModule {}
