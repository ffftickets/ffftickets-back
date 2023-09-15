"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs-modules/mailer/dist");
const templates_1 = require("./templates");
const mail_logs_service_1 = require("../mail-logs/mail-logs.service");
const sendTickets_1 = require("./templates/sendTickets");
const qrcode = require("qrcode");
const generate_order_1 = require("./templates/generate_order");
const order_completed_1 = require("./templates/order_completed");
const amazon_s3_service_1 = require("../amazon-s3/amazon-s3.service");
let MailService = MailService_1 = class MailService {
    constructor(mailerService, mailLogsService, amazon3SService) {
        this.mailerService = mailerService;
        this.mailLogsService = mailLogsService;
        this.amazon3SService = amazon3SService;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async sendEmail(dataEmail, dto) {
        try {
            const result = await this.mailerService.sendMail(dataEmail);
            this.mailLogsService.create({
                receiver: dataEmail.to,
                status: 'success',
                details: result,
                content: dataEmail,
                subject: dataEmail.subject,
            });
        }
        catch (error) {
            this.mailLogsService.create({
                receiver: dataEmail.to,
                status: 'error',
                details: error,
                content: { error: error.response, dto: dto },
                subject: dataEmail.subject,
            });
        }
    }
    async sendLoginEmail(loginMailDto) {
        const { email } = loginMailDto;
        this.logger.log('Enviando email login: ', email);
        const emailData = {
            to: email,
            subject: 'Notificación de inicio de sesión FFF Tickets',
            html: (0, templates_1.loginMail)(loginMailDto),
        };
        this.sendEmail(emailData, loginMailDto);
    }
    async registerEmail(registerDto) {
        const { email } = registerDto;
        this.logger.log('Enviando email login: ', email);
        const emailData = {
            to: email,
            subject: 'Notificación de registro FFF Tickets',
            html: (0, templates_1.RegisterTemplate)(registerDto),
        };
        this.sendEmail(emailData, registerDto);
    }
    async sendTicketsEmail(ticketsMailDto) {
        const { email } = ticketsMailDto;
        this.logger.log('Enviando email tickets: ', email);
        const eventName = ticketsMailDto.event.name;
        const newData = Object.assign(Object.assign({}, ticketsMailDto), { localities: await Promise.all(ticketsMailDto.localities.map(async (locality) => (Object.assign(Object.assign({}, locality), { qrs: await Promise.all(locality.qrs.map(async (qr) => await this.generarQRBase64(qr, eventName))) })))) });
        try {
            const emailData = {
                to: email,
                subject: 'Notificación de compra de tickets',
                html: await (0, sendTickets_1.sendTickets)(newData),
            };
            this.sendEmail(emailData, ticketsMailDto);
        }
        catch (error) { }
    }
    async sendOrderCompletedEmail(orderCompleteDto) {
        try {
            const { email } = orderCompleteDto;
            this.logger.log('Enviando email orden completada: ', email);
            const emailData = {
                to: email,
                subject: 'Notificación orden completada FFFTICKETS',
                html: await (0, order_completed_1.OrderComplete)(orderCompleteDto),
            };
            this.sendEmail(emailData, orderCompleteDto);
        }
        catch (error) { }
    }
    async sendOrderGeneratedEmail(generateOrderDto) {
        try {
            const { email } = generateOrderDto;
            this.logger.log('Enviando email orden generada: ', email);
            const emailData = {
                to: email,
                subject: 'Notificación orden generada FFFTICKETS',
                html: await (0, generate_order_1.GenerateOrder)(generateOrderDto),
            };
            this.sendEmail(emailData, generateOrderDto);
        }
        catch (error) { }
    }
    newPasswordEmail(newPasswordDto) {
        try {
            const { email } = newPasswordDto;
            this.logger.log('Enviando email nueva contraseña: ', email);
            const emailData = {
                to: email,
                subject: 'Notificación nueva contraseña FFF Tickets',
                html: (0, templates_1.GetNewPasswordTemplate)(newPasswordDto),
            };
            this.sendEmail(emailData, newPasswordDto);
        }
        catch (error) { }
    }
    passwordChangedEmail(email) {
        try {
            this.logger.log('Enviando email contraseña cambiada: ', email);
            const emailData = {
                to: email,
                subject: 'Notificación contraseña cambiada FFF Tickets',
                html: (0, templates_1.PasswordUpdate)(),
            };
            this.sendEmail(emailData, email);
        }
        catch (error) {
            console.log(error);
        }
    }
    async generarQRBase64(qrCodeData, event) {
        try {
            const qrCodeImageBuffer = await qrcode.toBuffer(qrCodeData);
            const qrCodeBase64 = qrCodeImageBuffer.toString('base64');
            let img = await this.amazon3SService.uploadBase64({
                route: `FFFQRS/${event}`,
                image: qrCodeBase64,
            });
            return img.imageUrl;
        }
        catch (error) {
            console.error(`Error al generar el código QR en formato base64: ${error}`);
            return '';
        }
    }
};
MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.MailerService,
        mail_logs_service_1.MailLogsService,
        amazon_s3_service_1.AmazonS3Service])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map