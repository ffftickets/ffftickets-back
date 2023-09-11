import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { EmailDataSend, GenerateOrderDto, LoginMailDto, TicketsEmailDto } from './dto';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { OrderCompletedDto } from './dto/order-completed';
export declare class MailService {
    private mailerService;
    private readonly mailLogsService;
    private readonly firebaseService;
    logger: Logger;
    constructor(mailerService: MailerService, mailLogsService: MailLogsService, firebaseService: FirebaseService);
    sendEmail(dataEmail: EmailDataSend, dto: any): Promise<void>;
    sendLoginEmail(loginMailDto: LoginMailDto): Promise<void>;
    sendTicketsEmail(ticketsMailDto: TicketsEmailDto): Promise<void>;
    sendOrderCompletedEmail(orderCompleteDto: OrderCompletedDto): Promise<void>;
    sendOrderGeneratedEmail(generateOrderDto: GenerateOrderDto): Promise<void>;
    generarQRBase64(qrCodeData: string): Promise<string>;
}
