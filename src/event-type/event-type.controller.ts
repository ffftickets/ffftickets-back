import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Res,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { Auth } from 'src/common/helpers/decorators';
import { AppResource } from 'src/app.roles';
import { Response } from 'express';
import { handleError } from 'src/common/helpers/error-handler.helper';
@ApiTags('Event Type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}
  logger = new Logger(EventTypeController.name);
  @Post('/seed-event-type')
  async create(@Res() res: Response) {
    try {
      this.logger.log('Creando seed de tipos de evento');
      const eventsType: CreateEventTypeDto[] = [
        { name: 'Publico', isActive: true },
        { name: 'Privado', isActive: true },
      ];
      const data = await this.eventTypeService.createSeed(eventsType);
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
      this.logger.log('Buscando todos los tipos eventos');
      const data = await this.eventTypeService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.EVENT_TYPE,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log('Actualizando tipo de evento: ', updateEventTypeDto.name);
      const data = this.eventTypeService.update(+id, updateEventTypeDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.EVENT_TYPE,
  })
  @Delete(':id')
  @Get()
  delete(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log('Eliminado tipo de evento: ', id);
      const data = this.eventTypeService.delete(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
