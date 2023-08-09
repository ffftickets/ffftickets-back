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
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from 'src/user/entities/user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from 'src/event/event.service';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
@ApiTags('Ventas')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly firebaseService: FirebaseService,
    private readonly eventService: EventService,
  ) {}

  logger = new Logger(SalesController.name);
  @Auth()
  @Post()
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    this.logger.log(`Creando nueva venta:`);
    createSaleDto.customer = user;
    const data = await this.salesService.create(createSaleDto);
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log(`Buscando todas las ventas`);
    const data = await await this.salesService.findAll(page, limit);
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
    if (data === null)
      throw new BadRequestException('No se encontraron ordenes pendientes');
    return res.status(HttpStatus.OK).json(data);
  }

  @Auth()
  @Patch('uploadVoucher/:id')
  async uploadVoucher(
    @Param('id') id: number,
    @Body() uploadPhoto: UploadPhotoDto,
    @GetUser() user: User,
  ) {
    this.logger.log('Subiendo comprobante de venta');
    return await this.salesService.uploadVoucher(id, user, uploadPhoto);
  }
}
