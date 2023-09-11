import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Res,
  HttpStatus,
  BadRequestException,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response,Request } from 'express';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from 'src/user/entities/user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from 'src/event/event.service';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { PayTypes } from './enum/pay-types.enum';
import { UpdateSaleCard } from './dto/update-sale-card';
import { IpDetailsInterceptor } from 'src/common/interceptors';
import { CreateLogPayCard } from 'src/log-pay-card/entities/log-pay-card.entity';
import { LogPayCardService } from 'src/log-pay-card/log-pay-card.service';
import { CreateLogSaleDto } from 'src/log-sale/dto/create-log-sale.dto';
import { LogSaleService } from 'src/log-sale/log-sale.service';
import { ActionSale } from 'src/log-sale/enum/sale-action.enum';

import { EncryptionService } from 'src/encryption/encryption.service';
@ApiTags('Ventas')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly logSaleService:LogSaleService,
    private readonly encryptionService:EncryptionService,
  ) {}

  logger = new Logger(SalesController.name);
  @Auth()
  @UseInterceptors(IpDetailsInterceptor)
  @Post()
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @Res() res: Response,
    @Req() req: Request,
    @GetUser() user: User,
  ) {
    this.logger.log(`Creando nueva venta:`);
    const logSale:CreateLogSaleDto={
      action: ActionSale.CREATE,
      data: createSaleDto,
      user: this.encryptionService.encryptData(user.identification),
      ipDetail: req['ip-details'],
      userAgent: req['ua'],
    }

    createSaleDto.customer = user;
    const data = await this.salesService.create(createSaleDto,logSale);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: string, // Agregar el parámetro 'status'
    @Query('payment_method') paymentMethod: string, // Agregar el parámetro 'payment_method'
  ) {
    this.logger.log(`Buscando todas las ventas`);
    const data = await this.salesService.findAll(page, limit, status, paymentMethod);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get('find/event')
  async findAllByEvent(
    @Res() res: Response,
    @Query('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: string, // Agregar el parámetro 'status'
    @Query('payment_method') paymentMethod: string, // Agregar el parámetro 'payment_method'
  ) {
    this.logger.log(`Buscando todas las ventas`);

    const data = await this.salesService.findAllByEvent(id,page, limit, status, paymentMethod);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    this.logger.log(`Buscando venta: ${id}`);
    const data = await this.salesService.findOne(id);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get('find/customer')
  async findByCustomer(
    @Res() res: Response,
    @GetUser() user: User,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log(`Buscando venta por usuario: ${user.email}`);
    const data = await this.salesService.findByCustomer(user.id,page,limit);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get('promoter/:promoter')
  async findByPromoter(
    @Param('promoter') promoter: number,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log(`Buscando venta por promotor: ${promoter}`);
    const data = await this.salesService.findByPromoter(promoter,page,limit);
    return res.status(HttpStatus.OK).json(data);
  }

  @Auth()
  @Get('verify/pending-purchase')
  async verifyPendingPurchase(@Res() res: Response, @GetUser() user: User) {
    this.logger.log(`Buscando venta pendiente de : ${user.email}`);
    const data = await this.salesService.verifyPendingPurchase(user.id);
    if (data === null || data.sale.payType!==PayTypes.TRANSFER)
      throw new BadRequestException('No se encontraron ordenes pendientes');
    return res.status(HttpStatus.OK).json(data);
  }

  @Auth()
  @UseInterceptors(IpDetailsInterceptor)
  @Patch('uploadVoucher/:id')
  async uploadVoucher(
    @Param('id') id: number,
    @Body() uploadPhoto: UploadPhotoDto,
    @Req() req: Request,
    @GetUser() user: User,
  ) {
    this.logger.log('Subiendo comprobante de venta');
    const logSale:CreateLogSaleDto={
      action: ActionSale.UPDATE,
      data: {saleUpdate:id},
      user: this.encryptionService.encryptData(user.identification),
      ipDetail: req['ip-details'],
      userAgent: req['ua'],
    }
    this.logSaleService.create(logSale);
    return await this.salesService.uploadVoucher(id, user, uploadPhoto);
  }


  @Auth()
  @UseInterceptors(IpDetailsInterceptor)
  @Patch(':id/validate/admin')
  async validateSaleAdmin(
    @Param('id') id: number,
    @Req() req: Request,
    @GetUser() user: User,
  ) {
    this.logger.log('Validando venta' + id);
    const logSale:CreateLogSaleDto={
      action: ActionSale.UPDATE,
      data: {saleUpdate:id},
      user: this.encryptionService.encryptData(user.identification),
      ipDetail: req['ip-details'],
      userAgent: req['ua'],
    }
    this.logSaleService.create(logSale);
    return await this.salesService.validateSaleAdmin(id);
  }
  @Auth()
  @UseInterceptors(IpDetailsInterceptor)
  @Patch(':id/validate/user')
  async validateSaleUser(
    @Param('id') id: number,
    @Body() updateSaleCard: UpdateSaleCard,
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    this.logger.log('Validando venta' + id);
    updateSaleCard.log.ipDetail = req['ip-details'];
    updateSaleCard.log.userAgent = req['ua'];
    const logSale:CreateLogSaleDto={
      action: ActionSale.UPDATE,
      data: updateSaleCard,
      user: this.encryptionService.encryptData(user.identification),
      ipDetail: req['ip-details'],
      userAgent: req['ua'],
    }
    this.logSaleService.create(logSale);
    const data = await this.salesService.updateSaleWIthCard(id,updateSaleCard);
    return res.status(HttpStatus.OK).json(data);;
  }
}
 