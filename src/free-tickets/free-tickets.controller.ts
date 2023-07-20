import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { FreeTicketsService } from './free-tickets.service';
import { CreateFreeTicketDto } from './dto/create-free-ticket.dto';
import { UpdateFreeTicketDto } from './dto/update-free-ticket.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from 'src/user/entities/user.entity';
@ApiTags('FreeTickets')
@Controller('free-tickets')
export class FreeTicketsController {
  constructor(private readonly freeTicketsService: FreeTicketsService) {}
  logger = new Logger(FreeTicketsController.name);
  @Auth()
  @Post()
  async create(
    @Body() createFreeTicketDto: CreateFreeTicketDto,
    @GetUser() user: User,
  ) {
    this.logger.log('Creando ticket gratuito');
    createFreeTicketDto.user = user;
    return await this.freeTicketsService.create(createFreeTicketDto);
  }

  @Get()
  async findAll() {
    return await this.freeTicketsService.findAll();
  }

  @Get('qrcode/:qr')
  async findOne(@Param('qr') qr: string) {
    return await this.freeTicketsService.findOneByQr(qr);
  }
  @Auth()
  @Get('findByUser')
  async findByUser(@GetUser() user: User) {
    return await this.freeTicketsService.findByUser(user.id);
  }
  @Auth()
  @Get('verifyTicketExist/:location')
  async verifyTicketExist(
    @Param('location') location: number,
    @GetUser() user: User,
   
  ) {
    return await this.freeTicketsService.verifyTicketExist(
      user,
      location,
    );
  }
}
