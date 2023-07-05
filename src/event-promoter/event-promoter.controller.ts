import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventPromoterService } from './event-promoter.service';
import { CreateEventPromoterDto } from './dto/create-event-promoter.dto';
import { UpdateEventPromoterDto } from './dto/update-event-promoter.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Promotor Evento')
@Controller('event-promoter')
export class EventPromoterController {
  constructor(private readonly eventPromoterService: EventPromoterService) {}

  @Post()
  create(@Body() createEventPromoterDto: CreateEventPromoterDto) {
    return this.eventPromoterService.create(createEventPromoterDto);
  }

  @Get()
  findAll() {
    return this.eventPromoterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventPromoterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventPromoterDto: UpdateEventPromoterDto) {
    return this.eventPromoterService.update(+id, updateEventPromoterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventPromoterService.remove(+id);
  }
}
