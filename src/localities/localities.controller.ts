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
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { handleError } from 'src/common/helpers/error-handler.helper';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from 'src/event/event.service';
import { UploadBase64ImageDto } from 'src/firebase/dto';
@ApiTags('Localities')
@Controller('localities')
export class LocalitiesController {
  constructor(
    private readonly localitiesService: LocalitiesService,
    private readonly firebaseService: FirebaseService,
    private readonly eventService: EventService,
  ) {}
  logger = new Logger(LocalitiesController.name);
  @Post()
  async create(
    @Body() createLocalityDto: CreateLocalityDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Creando localidad: `, createLocalityDto.name);
      const event = await this.eventService.findOne(createLocalityDto.event);
       await this.localitiesService.verifyExist(event.id,createLocalityDto.name) 
      createLocalityDto.event = event;
      const uploadImg: UploadBase64ImageDto = {
        image: createLocalityDto.photo,
        route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${createLocalityDto.name}`,
      };
      createLocalityDto.photo = (
        await this.firebaseService.uploadBase64(uploadImg)
      ).imageUrl;
      const data = await this.localitiesService.create(createLocalityDto);
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
      this.logger.log('Buscando todas las localidades');
      const data = await this.localitiesService.findAll();
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
      this.logger.log(`Buscando localidad: ${id}`);
      const data = await this.localitiesService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('event/:event')
  async getLocalitiesByEvent(@Param('event') event: string, @Res() res: Response) {
    try {
      this.logger.log(`Buscando localidad por evento: ${event}`);
      const data = await this.localitiesService.getLocalitiesByEvent(+event);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocalityDto: UpdateLocalityDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Actualizando localidad: ${id}`);
      const locality = await this.localitiesService.findOne(+id);

      const event = await this.eventService.findOne(+locality.event.id);
      if (updateLocalityDto.photo) {
        const uploadImg: UploadBase64ImageDto = {
          image: updateLocalityDto.photo,
          route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${locality.name}`,
        };
        updateLocalityDto.photo = (
          await this.firebaseService.uploadBase64(uploadImg)
        ).imageUrl;
      }
      if (locality.photo) console.log(locality.photo);
      await this.firebaseService.deleteImageByUrl(locality.photo);
      const data = await this.localitiesService.update(+id, updateLocalityDto);
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
      this.logger.log(`Eliminando localidad: ${id}`);
      const data = await this.localitiesService.remove(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
