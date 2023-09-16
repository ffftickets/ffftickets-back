import { PartialType } from '@nestjs/swagger';
import { CreateBillsFffDto } from './create-bills_fff.dto';

export class UpdateBillsFffDto extends PartialType(CreateBillsFffDto) {}
