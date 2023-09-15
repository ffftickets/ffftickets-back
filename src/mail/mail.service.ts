import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer/dist';
import {
  EmailDataSend,
  GenerateOrderDto,
  GetNewPasswordDto,
  LoginMailDto,
  Register,
  TicketsEmailDto,
} from './dto';
import {
  GetNewPasswordTemplate,
  PasswordUpdate,
  RegisterTemplate,
  loginMail,
} from './templates';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { sendTickets } from './templates/sendTickets';

import * as qrcode from 'qrcode';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { GenerateOrder } from './templates/generate_order';
import { OrderCompletedDto } from './dto/order-completed';
import { OrderComplete } from './templates/order_completed';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
@Injectable()
export class MailService {
  logger = new Logger(MailService.name);
  constructor(
    private mailerService: MailerService,
    private readonly mailLogsService: MailLogsService,
    private readonly amazon3SService: AmazonS3Service,
  ) {}

  async sendEmail(dataEmail: EmailDataSend, dto: any) {
    try {
      const result = await this.mailerService.sendMail(dataEmail);

      this.mailLogsService.create({
        receiver: dataEmail.to,
        status: 'success',
        details: result,
        content: dataEmail,
        subject: dataEmail.subject,
      });
    } catch (error) {
      this.mailLogsService.create({
        receiver: dataEmail.to,
        status: 'error',
        details: error,
        content: { error: error.response, dto: dto },
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
    this.sendEmail(emailData, loginMailDto);
  }
  async registerEmail(registerDto: Register) {
    const { email } = registerDto;
    this.logger.log('Enviando email login: ', email);
    const emailData = {
      to: email,
      subject: 'Notificación de registro FFF Tickets',
      html: RegisterTemplate(registerDto),
    };
    this.sendEmail(emailData, registerDto);
  }
  async sendTicketsEmail(ticketsMailDto: TicketsEmailDto) {
    const { email } = ticketsMailDto;
    this.logger.log('Enviando email tickets: ', email);
    const eventName = ticketsMailDto.event.name;
    console.log(ticketsMailDto)
    const newData = {
      ...ticketsMailDto,
      localities: await Promise.all(
        ticketsMailDto.localities.map(async (locality) => ({
          ...locality,
          qrs: await Promise.all(
            locality.qrs.map(async (qr) => await this.generarQRBase64(qr,eventName)),
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
      this.sendEmail(emailData, ticketsMailDto);
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
      this.sendEmail(emailData, orderCompleteDto);
    } catch (error) {}
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
      this.sendEmail(emailData, generateOrderDto);
    } catch (error) {}
  }
  newPasswordEmail(newPasswordDto: GetNewPasswordDto) {
    try {
      const { email } = newPasswordDto;
      this.logger.log('Enviando email nueva contraseña: ', email);
      const emailData = {
        to: email,
        subject: 'Notificación nueva contraseña FFF Tickets',
        html: GetNewPasswordTemplate(newPasswordDto),
      };
      this.sendEmail(emailData, newPasswordDto);
    } catch (error) {}
  }
  passwordChangedEmail(email: string) {
    try {
      this.logger.log('Enviando email contraseña cambiada: ', email);
      const emailData = {
        to: email,
        subject: 'Notificación contraseña cambiada FFF Tickets',
        html: PasswordUpdate(),
      };
     
      this.sendEmail(emailData, email);
    } catch (error) {
      console.log(error)
    }
  }

  //Para generar las imagenes de los QR
  async generarQRBase64(qrCodeData: string,event:string): Promise<string> {
    try {
      const qrCodeImageBuffer = await qrcode.toBuffer(qrCodeData);
      const qrCodeBase64 = qrCodeImageBuffer.toString('base64');
      let img = await this.amazon3SService.uploadBase64({
        route: `FFFQRS/${event}`,
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
