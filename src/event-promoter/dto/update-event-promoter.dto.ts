import { PartialType } from '@nestjs/swagger';
import { CreateEventPromoterDto } from './create-event-promoter.dto';

export class UpdateEventPromoterDto extends PartialType(CreateEventPromoterDto) {}
