import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { LoginMailDto, TicketsEmailDto } from './dto';
import { MailLogsService } from 'src/mail-logs/mail-logs.service';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class MailService {
    private mailerService;
    private readonly mailLogsService;
    private readonly firebaseService;
    logger: Logger;
    constructor(mailerService: MailerService, mailLogsService: MailLogsService, firebaseService: FirebaseService);
    sendLoginEmail(loginMailDto: LoginMailDto): Promise<void>;
    sendTicketsEmail(ticketsMailDto: TicketsEmailDto): Promise<void>;
    generarQRBase64(qrCodeData: string): Promise<string>;
}
