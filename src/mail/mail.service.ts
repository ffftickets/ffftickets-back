import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer/dist';
import { EmailDataSend, GenerateOrderDto, LoginMailDto, TicketsEmailDto } from './dto';
import { loginMail } from './templates';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { sendTickets } from './templates/sendTickets';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as qrcode from 'qrcode';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { GenerateOrder } from './templates/generate_order';
import { OrderCompletedDto } from './dto/order-completed';
import { OrderComplete } from './templates/order_completed';
@Injectable()
export class MailService {
  logger = new Logger(MailService.name);
  constructor(
    private mailerService: MailerService,
    private readonly mailLogsService: MailLogsService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async sendEmail(dataEmail: EmailDataSend,dto:any) {
    try {
      const result = await this.mailerService.sendMail(dataEmail);

      this.mailLogsService.create({
        receiver: dataEmail.to,
        status: 'success',
        details: result,
        content: dto,
        subject: dataEmail.subject,
      });
    } catch (error) {
      this.mailLogsService.create({
        receiver: dataEmail.to,
        status: 'error',
        details: error,
        content: {error: error.response,dto: dto},
        subject: dataEmail.subject,
      });
    }
  }

  async sendLoginEmail(loginMailDto: LoginMailDto) {
    const { email } = loginMailDto;
    this.logger.log('Enviando email login: ', email);

    const emailData = {
      to: email,
      subject: 'Notificación de inicio de sesión FFF Tickets',
      html: loginMail(loginMailDto),
    };
    this.sendEmail(emailData,loginMailDto);
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
            locality.qrs.map(async (qr) => await this.generarQRBase64(qr)),
          ),
        })),
      ),
    };

    try {
      const emailData = {
        to: email,
        subject: 'Notificación de compra de tickets',
        html: await sendTickets(newData),
      };
      this.sendEmail(emailData,ticketsMailDto);
    } catch (error) {}
  }
  async sendOrderCompletedEmail(orderCompleteDto: OrderCompletedDto) {
    try {
    
      const { email } = orderCompleteDto;
    this.logger.log('Enviando email orden completada: ', email);

    const emailData = {
      to: email,
      subject: 'Notificación orden completada FFFTICKETS',
      html: await OrderComplete(orderCompleteDto),
    };
    this.sendEmail(emailData,orderCompleteDto);
    } catch (error) {
      
    }
  }

  async sendOrderGeneratedEmail(generateOrderDto: GenerateOrderDto) {
    try {
      const { email } = generateOrderDto;
    this.logger.log('Enviando email orden generada: ', email);

    const emailData = {
      to: email,
      subject: 'Notificación orden generada FFFTICKETS',
      html: await GenerateOrder(generateOrderDto),
    };
    this.sendEmail(emailData,generateOrderDto);
    } catch (error) {
      
    }
    

  }

  //Para generar las imagenes de los QR
  async generarQRBase64(qrCodeData: string): Promise<string> {
    try {
      const qrCodeImageBuffer = await qrcode.toBuffer(qrCodeData);
      const qrCodeBase64 = qrCodeImageBuffer.toString('base64');
      let img = await this.firebaseService.uploadBase64({
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
