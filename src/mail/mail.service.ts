import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer/dist';
import { LoginMailDto, TicketsEmailDto } from './dto';
import { loginMail } from './templates';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { sendTickets } from './templates/sendTickets';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as qrcode from 'qrcode';
import { Ticket } from 'src/tickets/entities/ticket.entity';
@Injectable()
export class MailService {
  logger = new Logger(MailService.name);
  constructor(
    private mailerService: MailerService,
    private readonly mailLogsService: MailLogsService,
    private readonly firebaseService: FirebaseService,
  ) {}

  
  async sendLoginEmail(loginMailDto: LoginMailDto) {
    const { email } = loginMailDto;
    this.logger.log('Enviando email login: ', email);

    const data = {
      name: 'Alex Villegas',
      event: {
        name: 'Evento de prueba',
        event_date: '4 de septiembre de 2023 a las 16:50',
        place: 'Quito',
        user: {
          name: 'NH FEST',
        },
      },
      sale: {
        id: 1,
        costumer: {
          name: 'Alex Villegas',
        },
      },
      localities: [
        {
          qrs: ['qr1', 'qr2', 'qr3'],
          localityName: 'General',
        },
        {
          qrs: ['qr4', 'qr5', 'qr6'],
          localityName: 'VIP',
        },
      ],
    };

    const newData:any = {
      ...data,
      localities: await Promise.all(
        data.localities.map(async (locality) => ({
          ...locality,
          qrs: await Promise.all(
            locality.qrs.map(async (qr) => await this.generarQRBase64(qr))
          ),
        }))
      ),
    };
    
    try {
      const emailContent = await sendTickets(newData);
    
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'Notificación de compra de tickets',
        html: emailContent,
      });
    
      this.mailLogsService.create({
        receiver: email,
        status: 'success',
        details: result,
        content: { email: loginMail(loginMailDto) }, // Cambio de sendLogin a sendEmailTickets
      });
    } catch (error) {
      this.mailLogsService.create({
        receiver: email,
        status: 'error',
        details: error,
        content: error.response || loginMailDto,
      });
    }
  
    
    
    
    
  }
  async sendTicketsEmail(ticketsMailDto: TicketsEmailDto) {
    const { email } = ticketsMailDto;
    this.logger.log('Enviando email tickets: ', email);


    const newData = {
      ...ticketsMailDto,
      localities: await Promise.all(
        ticketsMailDto.localities.map(async (locality) => ({
          ...locality,
          qrs: await Promise.all(
            locality.qrs.map(async (qr) => await this.generarQRBase64(qr))
          ),
        }))
      ),
    };
    
    try {
      const emailContent = await sendTickets(newData);
    
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'Notificación de compra de tickets',
        html: emailContent,
      });
    
      this.mailLogsService.create({
        receiver: email,
        status: 'success',
        details: result,
        content: { email: emailContent }, // Cambio de sendLogin a sendEmailTickets
      });
    } catch (error) {
      this.mailLogsService.create({
        receiver: email,
        status: 'error',
        details: error,
        content: error.response || sendTickets,
      });
    }
  
    
    
    
    
  }
  
  
  async generarQRBase64(qrCodeData: string): Promise<string> {
    try {
      const qrCodeImageBuffer = await qrcode.toBuffer(qrCodeData);
      const qrCodeBase64 = qrCodeImageBuffer.toString('base64');
      let img =  await this.firebaseService.uploadBase64({
        route: `FFFQRS`,
        image: qrCodeBase64,
      });
      return img.imageUrl;
    } catch (error) {
      console.error(
        `Error al generar el código QR en formato base64: ${error}`,
      );
      return '';
    }
  }

}
