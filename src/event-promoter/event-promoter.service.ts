import { Injectable } from '@nestjs/common';
import { CreateEventPromoterDto } from './dto/create-event-promoter.dto';
import { UpdateEventPromoterDto } from './dto/update-event-promoter.dto';

@Injectable()
export class EventPromoterService {
  create(createEventPromoterDto: CreateEventPromoterDto) {
    return 'This action adds a new eventPromoter';
  }

  findAll() {
    return `This action returns all eventPromoter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventPromoter`;
  }

  update(id: number, updateEventPromoterDto: UpdateEventPromoterDto) {
    return `This action updates a #${id} eventPromoter`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventPromoter`;
  }
}
