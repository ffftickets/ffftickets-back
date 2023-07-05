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
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';
import { handleError } from 'src/common/helpers/error-handler.helper';
import { Response } from 'express';
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  logger = new Logger(TicketsController.name);

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.ticketsService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.ticketsService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Get('/qr/:qr')
  async findByQR(@Param('qr') qr: string, @Res() res: Response) {
    try {
      const data = await this.ticketsService.findOneByQR(qr);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('/sale/:sale')
  async findByEvent(@Param('sale') sale: number, @Res() res: Response) {
    try {
      const data = await this.ticketsService.findBySale(sale);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
