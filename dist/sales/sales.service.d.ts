import { Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { LocalitiesService } from 'src/localities/localities.service';
import { User } from 'src/user/entities/user.entity';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UpdateSaleCard } from './dto/update-sale-card';
import { LogPayCardService } from 'src/log-pay-card/log-pay-card.service';
import { MailService } from 'src/mail/mail.service';
import { CreateLogSaleDto } from 'src/log-sale/dto/create-log-sale.dto';
import { LogSaleService } from 'src/log-sale/log-sale.service';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
import { BillsFffService } from 'src/bills_fff/bills_fff.service';
export declare class SalesService {
    private readonly saleRepository;
    private readonly eventService;
    private readonly userService;
    private readonly ticketService;
    private readonly localitiesService;
    private readonly encryptionService;
    private readonly logPayCardService;
    private readonly mailService;
    private readonly logSaleService;
    private readonly amazon3SService;
    private readonly billsFffService;
    logger: Logger;
    constructor(saleRepository: Repository<Sale>, eventService: EventService, userService: UserService, ticketService: TicketsService, localitiesService: LocalitiesService, encryptionService: EncryptionService, logPayCardService: LogPayCardService, mailService: MailService, logSaleService: LogSaleService, amazon3SService: AmazonS3Service, billsFffService: BillsFffService);
    create(createSaleDto: CreateSaleDto, logSale: CreateLogSaleDto): Promise<{
        message: string;
        saleId: number;
    }>;
    calcularPrecioConIVA(iva: boolean, valor: number): {
        precioSinIVA: number;
        ivaPagado: number;
    };
    deleteSaleAndTickets(saleDelete: any): Promise<void>;
    calculateServiceValue(tickets: any[], commission: number): any;
    findAll(page: number, limit: number, status: string, paymentMethod: string): Promise<{
        sales: Sale[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    findAllByEvent(event: number, page: number, limit: number, status: string, paymentMethod: string): Promise<{
        sales: Sale[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    findOne(id: number): Promise<Sale>;
    findByCustomer(id: number, page?: number, limit?: number): Promise<{
        sales: {
            ticketCount: any;
            id: number;
            event: import("../event/entities/event.entity").Event;
            promoter: User;
            customer: any;
            payType: string;
            status: string;
            authorizationNumber?: string;
            transactionCode?: string;
            transfer_photo?: string;
            serviceValue: number;
            catwalkCommission?: number;
            promoterDiscount: number;
            total: number;
            authorization_date: Date;
            createdAt: Date;
            updatedAt: Date;
            bill: import("../bills_fff/entities/bills_fff.entity").BillsFff;
        }[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    verifyPendingPurchase(customer: number): Promise<{
        sale: any;
        localities: {
            localityName: string;
            ticketCount: number;
            price: number;
            localityId: number;
            total: number;
        }[];
    }>;
    verifyInfoSaleWIthLocalities(saleId: number): Promise<{
        sale: any;
        localities: {
            localityName: string;
            ticketCount: number;
            price: number;
            localityId: number;
            total: number;
        }[];
    }>;
    findByPromoter(id: number, page?: number, limit?: number): Promise<{
        sales: Sale[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    uploadVoucher(id: number, user: User, uploadPhoto: UploadPhotoDto): Promise<Sale>;
    validateSaleAdmin(id: number, body: any): Promise<Sale>;
    updateSaleWIthCard(id: number, updateSaleCard: UpdateSaleCard): Promise<string>;
    transformTicketsToLocalities(tickets: any): unknown[];
    generateDataToEmailCompleteOrder(id: number): Promise<void>;
    generateDataToEmailTickets(idSale: number): Promise<void>;
}
