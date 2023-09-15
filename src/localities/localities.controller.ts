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


import { EventService } from 'src/event/event.service';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
import { UploadBase64ImageDto } from 'src/amazon-s3/dto/upload-base64-image.dto';

@ApiTags('Localities')
@Controller('localities')
export class LocalitiesController {
  constructor(
    private readonly localitiesService: LocalitiesService,
    private readonly amazonS3Service: AmazonS3Service,
    private readonly eventService: EventService,
  ) {}
  logger = new Logger(LocalitiesController.name);
  @Post()
  async create(
    @Body() createLocalityDto: CreateLocalityDto,
    @Res() res: Response,
  ) {
    this.logger.log(`Creando localidad: `, createLocalityDto.name);

    //?Verificar si existe el evento
    const event = await this.eventService.findOne(createLocalityDto.event);
    createLocalityDto.event = event;
   
    //?Verificar si existe una localidad con el mismo nombre
    await this.localitiesService.verifyExist(event.id, createLocalityDto.name);
   
    //?Verificar si viene foto y subirla a firebase
     
    if (createLocalityDto.photo !== undefined) {
      const uploadImg: UploadBase64ImageDto = {
        image: createLocalityDto.photo,
        route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${createLocalityDto.name}`,
      };
      createLocalityDto.photo = (
        await this.amazonS3Service.uploadBase64(uploadImg)
      ).imageUrl; 
    }
  
    const data = await this.localitiesService.create(createLocalityDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAll(@Res() res: Response) {
    this.logger.log('Buscando todas las localidades');
    const data = await this.localitiesService.findAll();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Buscando localidad: ${id}`);
    const data = await this.localitiesService.findOne(+id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('event/:event')
  async getLocalitiesByEvent(
    @Param('event') event: string,
    @Res() res: Response,
  ) {
    this.logger.log(`Buscando localidad por evento: ${event}`);
    const data = await this.localitiesService.getLocalitiesByEvent(+event);
    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocalityDto: UpdateLocalityDto,
    @Res() res: Response,
  ) {
    this.logger.log(`Actualizando localidad: ${id}`);
    const locality = await this.localitiesService.findOne(+id);

    const event = await this.eventService.findOne(+locality.event.id);
    console.log(updateLocalityDto.photo)
    if (updateLocalityDto.photo) {
      const uploadImg: UploadBase64ImageDto = {
        image: updateLocalityDto.photo,
        route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${locality.name}`,
      };
      updateLocalityDto.photo = (
        await this.amazonS3Service.uploadBase64(uploadImg)
      ).imageUrl;
    }
    if (locality.photo)
    await this.amazonS3Service.deleteImageByUrl(locality.photo);
    const data = await this.localitiesService.update(+id, updateLocalityDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Eliminando localidad: ${id}`);
    const data = await this.localitiesService.remove(+id);
    return res.status(HttpStatus.OK).json(data);
  }
}
