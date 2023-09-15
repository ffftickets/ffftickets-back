import { Logger } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Response, Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { UpdateSaleCard } from './dto/update-sale-card';
import { LogSaleService } from 'src/log-sale/log-sale.service';
import { EncryptionService } from 'src/encryption/encryption.service';
export declare class SalesController {
    private readonly salesService;
    private readonly logSaleService;
    private readonly encryptionService;
    constructor(salesService: SalesService, logSaleService: LogSaleService, encryptionService: EncryptionService);
    logger: Logger;
    create(createSaleDto: CreateSaleDto, res: Response, req: Request, user: User): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, page: number, limit: number, status: string, paymentMethod: string): Promise<Response<any, Record<string, any>>>;
    findAllByEvent(res: Response, id: number, page: number, limit: number, status: string, paymentMethod: string): Promise<Response<any, Record<string, any>>>;
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    findByCustomer(res: Response, user: User, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    findByPromoter(promoter: number, res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    verifyPendingPurchase(res: Response, user: User): Promise<Response<any, Record<string, any>>>;
    uploadVoucher(id: number, uploadPhoto: UploadPhotoDto, req: Request, user: User): Promise<import("./entities/sale.entity").Sale>;
    validateSaleAdmin(id: number, req: Request, user: User, body: any): Promise<import("./entities/sale.entity").Sale>;
    validateSaleUser(id: number, updateSaleCard: UpdateSaleCard, req: Request, res: Response, user: User): Promise<Response<any, Record<string, any>>>;
}
