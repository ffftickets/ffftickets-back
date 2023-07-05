import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Res, HttpStatus } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { handleError } from 'src/common/helpers/error-handler.helper';
@ApiTags('Ventas')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  logger = new Logger(SalesController.name);

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto,
  @Res() res: Response,) {
    try {
      this.logger.log(`Creando nueva venta:`);
      const data = await this.salesService.create(createSaleDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get()
  async findAll(@Res() res: Response,) {
    try {
      this.logger.log(`Buscnado todas las ventas:`);
      const data = await await this.salesService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
    
    
  

  @Get(':id')
  async findOne(@Param('id') id: number,@Res() res: Response,) {
    try {
      this.logger.log(`Buscando venta: ${id}`);
      const data = await this.salesService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('customer/:customer')
  async findByCustomer(@Param('customer') customer: number,@Res() res: Response,) {
    try {
      this.logger.log(`Buscando venta por usuario: ${customer}`);
      const data = await this.salesService.findByCustomer(customer);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('promoter/:promoter')
  async findByPromoter(@Param('promoter') promoter: number,@Res() res: Response,) {
    try {
      this.logger.log(`Buscando venta por promotor: ${promoter}`);
      const data = await this.salesService.findByPromoter(promoter);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('organizer/:organizer')
  async findByOrganizer(@Param('organizer') organizer: number,@Res() res: Response,) {
    try {
      this.logger.log(`Buscando venta por organizador: ${organizer}`);
      const data = await this.salesService.findByOrganizer(organizer);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
    
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
