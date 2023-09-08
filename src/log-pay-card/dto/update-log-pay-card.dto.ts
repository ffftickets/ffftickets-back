import { PartialType } from '@nestjs/swagger';
import { CreateLogPayCardDto } from './create-log-pay-card.dto';

export class UpdateLogPayCardDto extends PartialType(CreateLogPayCardDto) {}
