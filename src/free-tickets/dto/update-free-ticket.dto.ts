import { PartialType } from '@nestjs/swagger';
import { CreateFreeTicketDto } from './create-free-ticket.dto';

export class UpdateFreeTicketDto extends PartialType(CreateFreeTicketDto) {}
