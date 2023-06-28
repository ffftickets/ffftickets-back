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
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
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
      if (
        updateEventDto.ticket 
      ) {
        let img = await this.firebaseService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}`,
          image: updateEventDto.ticket,
        });
        updateEventDto.ticket = img.imageUrl;
      }
      if (updateEventDto.courtesy_ticket) {
        let img = await this.firebaseService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}`,
          image: updateEventDto.courtesy_ticket,
        });
        updateEventDto.courtesy_ticket = img.imageUrl;
      }
      if (updateEventDto.poster) {
        let img = await this.firebaseService.uploadBase64({
          route: `${user.id} - ${user.name}/${event.name}`,
          image: updateEventDto.poster,
        });
        updateEventDto.poster = img.imageUrl;
      }
      if (updateEventDto.event_gallery) {
        const updatedImages = [];
        for (const image of updateEventDto.event_gallery) {
          const img = await this.firebaseService.uploadBase64({
            route: `${user.id} - ${user.name}/${event.name}`,
            image: image,
          });
          updatedImages.push(img.imageUrl);
        }
        updateEventDto.event_gallery = updatedImages;
      }
      if (updateEventDto.informative_gallery) {
        const updatedImages = [];
        for (const image of updateEventDto.informative_gallery) {
          const img = await this.firebaseService.uploadBase64({
            route: `${user.id} - ${user.name}/${event.name}`,
            image: image,
          });
          updatedImages.push(img.imageUrl);
        }
        updateEventDto.informative_gallery = updatedImages;
      }
      console.log('eventDto', updateEventDto);
      const data = await this.eventService.update(+id, updateEventDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
