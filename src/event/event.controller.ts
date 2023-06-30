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
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/common/helpers/error-handler.helper';
import { Response } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly firebaseService: FirebaseService,
  ) {}

  logger = new Logger(EventController.name);
  @Auth()
  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Creando evento: `, createEventDto.name);
      createEventDto.user = user;
      const data = await this.eventService.create(createEventDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      this.logger.log('Buscando todos los eventos');
      const data = await this.eventService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log(`Buscando evento: ${id} `);
      const data = await this.eventService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('organizer/:organizer')
  async findEventsByUser(@Param('organizer') organizer: string, @Res() res: Response) {
    try {
      this.logger.log(`Buscando eventos de usuario: ${organizer} `);
      const data = await this.eventService.findEventsByUser(+organizer);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }



  @Auth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Actualizando evento: `, updateEventDto.name);
      const event = await this.eventService.findOne(+id);
      this.logger.log('Verificando tickets.');

      this.logger.log('Verificando pases de cortesía.');
      if (updateEventDto.courtesy_ticket) {
        let img = await this.firebaseService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}`,
          image: updateEventDto.courtesy_ticket,
        });
        if (event.courtesy_ticket)
          this.firebaseService.deleteImageByUrl(event.courtesy_ticket);
        updateEventDto.courtesy_ticket = img.imageUrl;
      }
      this.logger.log('Verificando poster.');
      if (updateEventDto.poster) {
        let img = await this.firebaseService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}`,
          image: updateEventDto.poster,
        });
        if (event.poster) this.firebaseService.deleteImageByUrl(event.poster);
        updateEventDto.poster = img.imageUrl;
      }
      this.logger.log('Verificando galería de eventos.');
      if (updateEventDto.event_gallery) {
        const updatedImages = [];
        for (const image of updateEventDto.event_gallery) {
          const img = await this.firebaseService.uploadBase64({
            route: `${user.id} - ${user.name}/${event.name}/event-gallery`,
            image: image,
          });
          updatedImages.push(img.imageUrl);
        }
        updateEventDto.event_gallery = [
          ...updatedImages,
          ...event.event_gallery,
        ];
      }
      this.logger.log('Verificando galería informativa.');
      if (updateEventDto.informative_gallery) {
        const updatedImages = [];
        for (const image of updateEventDto.informative_gallery) {
          const img = await this.firebaseService.uploadBase64({
            route: `${user.id} - ${user.name}/${event.name}/informative-gallery`,
            image: image,
          });
          updatedImages.push(img.imageUrl);
        }
        updateEventDto.informative_gallery = [
          ...updatedImages,
          ...event.informative_gallery,
        ];
      }
      const data = await this.eventService.update(+id, updateEventDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete('/img/:id/:url')
  async deleteImgEvent(
    @Param('id') id: string,
    @Param('url') url: string,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Eliminando imagen: ${url}`);
      const data = await this.eventService.deleteImgEvent(+id, url);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log(`Eliminando evento: ${id}`);
      const data = await this.eventService.remove(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
