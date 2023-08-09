import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer/dist';
import { LoginMailDto } from './dto';
import { loginMail } from './templates';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
@Injectable()
export class MailService {
  logger = new Logger(MailService.name);
  constructor(  private mailerService: MailerService,private readonly mailLogsService:MailLogsService){

  }
  
 
  async sendLoginEmail(loginMailDto: LoginMailDto) {
    const { email } = loginMailDto;
    this.logger.log('Enviando email login: ', email);
    this.mailerService 
      .sendMail({
        to: email,
        subject: 'Notificación FFFTickets',
        html: loginMail(loginMailDto), 
      }) 
      .then((result) => {
        
         this.mailLogsService.create({
          receiver: email,
          status: 'success',
          details: result,
          content: {email:loginMail(loginMailDto)},
        });
      })
      .catch((error) => { 
       
          this.mailLogsService.create({
          receiver: email,
          status: 'error',
          details: error,
          content: error.response || loginMailDto,
        });
      });
  }
}
