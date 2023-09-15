import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { EmailDataSend, GenerateOrderDto, GetNewPasswordDto, LoginMailDto, Register, TicketsEmailDto } from './dto';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { OrderCompletedDto } from './dto/order-completed';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
export declare class MailService {
    private mailerService;
    private readonly mailLogsService;
    private readonly amazon3SService;
    logger: Logger;
    constructor(mailerService: MailerService, mailLogsService: MailLogsService, amazon3SService: AmazonS3Service);
    sendEmail(dataEmail: EmailDataSend, dto: any): Promise<void>;
    sendLoginEmail(loginMailDto: LoginMailDto): Promise<void>;
    registerEmail(registerDto: Register): Promise<void>;
    sendTicketsEmail(ticketsMailDto: TicketsEmailDto): Promise<void>;
    sendOrderCompletedEmail(orderCompleteDto: OrderCompletedDto): Promise<void>;
    sendOrderGeneratedEmail(generateOrderDto: GenerateOrderDto): Promise<void>;
    newPasswordEmail(newPasswordDto: GetNewPasswordDto): void;
    passwordChangedEmail(email: string): void;
    generarQRBase64(qrCodeData: string, event: string): Promise<string>;
}
