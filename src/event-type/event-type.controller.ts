import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { Auth } from 'src/common/helpers/decorators';
import { AppResource } from 'src/app.roles';
@ApiTags('Event Type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post('/seed-event-type')
  create() {
    const eventsType: CreateEventTypeDto[] = [
      { name: 'Publico', isActive: true },
      { name: 'Privado', isActive: true },
    ];
    return this.eventTypeService.createSeed(eventsType);
  }

  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.EVENT_TYPE,
  })
  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.EVENT_TYPE,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypeService.update(+id, updateEventTypeDto);
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.EVENT_TYPE,
  })
  @Delete(':id')
  @Get()
  delete(@Param('id') id: string) {
    return this.eventTypeService.delete(+id);
  }
}
