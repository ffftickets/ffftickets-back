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
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from 'src/user/entities/user.entity';

import { Response } from 'express';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';


@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly amazon3SService: AmazonS3Service,
  ) {}

  logger = new Logger(EventController.name);
  @Auth()
  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    this.logger.log(`Creando evento: `, createEventDto.name);
    createEventDto.user = user;
    const data = await this.eventService.create(createEventDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log('Buscando todos los eventos');
    const data = await this.eventService.findAll(page, limit);
    return res.status(HttpStatus.OK).json(data);
  }

  @Auth()
  @Get('/find/administration')
  async findAllForAdmin(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log('Buscando todos los eventos para administración');
    const data = await this.eventService.findAllForAdmin(page, limit);
    return res.status(HttpStatus.OK).json(data);
  }



  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Buscando evento: ${id} `);
    const data = await this.eventService.findOne(+id);
    return res.status(HttpStatus.OK).json(data);
  }
  
  @Auth()
  @Get('organizer/:organizer')
  async findEventsByOrganizer(
    @Param('organizer') organizer: number,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log(`Buscando eventos del organizador para public: ${organizer} `);
    const data = await this.eventService.findEventsByUser(
      organizer,
      page,
      limit,
    );
    return res.status(HttpStatus.OK).json(data);
  }
  @Auth()
  @Get('user/events')
  async findEventsByUser(
    @GetUser() user: User,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log(`Buscando eventos del organizador para organizador: ${user.id} `);
    const data = await this.eventService.findEventsByUser(
      user.id,
      page,
      limit,
    );
    return res.status(HttpStatus.OK).json(data);
  }

  @Auth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    this.logger.log(`Actualizando evento: `, id);
    const event = await this.eventService.findOne(+id);
    this.logger.log('Verificando tickets.');

    this.logger.log('Verificando pases de cortesía.');
    if (updateEventDto.courtesy_ticket) {
      let img = await this.amazon3SService.uploadBase64({
        route: `${user.id} - ${user.name}/${event.name}`,
        image: updateEventDto.courtesy_ticket,
      });
      if (event.courtesy_ticket)
        this.amazon3SService.deleteImageByUrl(event.courtesy_ticket);
      updateEventDto.courtesy_ticket = img.imageUrl;
    }
    this.logger.log('Verificando poster.');
    if (updateEventDto.poster) {
      let img = await this.amazon3SService.uploadBase64({
        route: `${user.id} - ${user.name}/${event.name}`,
        image: updateEventDto.poster,
      });
      if (event.poster) this.amazon3SService.deleteImageByUrl(event.poster);
      updateEventDto.poster = img.imageUrl;
    }
    this.logger.log('Verificando galería de eventos.');
    if (updateEventDto.event_gallery) {

      const updatedImages = [];
      for (const image of updateEventDto.event_gallery) {

        const img = await this.amazon3SService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}/event-gallery`,
          image: image,
        });
        updatedImages.push(img.imageUrl);
      }
      if (event.event_gallery === null) {
        updateEventDto.event_gallery = [...updatedImages];
      } else {
        updateEventDto.event_gallery = [
          ...updatedImages,
          ...event.event_gallery,
        ];
      }
    }
    this.logger.log('Verificando galería informativa.');
    if (updateEventDto.informative_gallery) {
      const updatedImages = [];
      for (const image of updateEventDto.informative_gallery) {
        const img = await this.amazon3SService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}/informative-gallery`,
          image: image,
        });
        updatedImages.push(img.imageUrl);
      }
      if (event.informative_gallery === null) {
        updateEventDto.informative_gallery = [...updatedImages];
      } else {
        updateEventDto.informative_gallery = [
          ...updatedImages,
          ...event.informative_gallery,
        ];
      }
    }
    const data = await this.eventService.update(+id, updateEventDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Delete('/img/:id/:url')
  async deleteImgEvent(
    @Param('id') id: string,
    @Param('url') url: string,
    @Res() res: Response,
  ) {
    this.logger.log(`Eliminando imagen: ${url}`);
    const data = await this.eventService.deleteImgEvent(+id, url);
    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Eliminando evento: ${id}`);
    const data = await this.eventService.remove(+id);
    return res.status(HttpStatus.OK).json(data);
  }
}
