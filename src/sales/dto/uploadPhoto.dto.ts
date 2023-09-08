import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SaleStatus } from '../enum/sale-status.enum';
import { PayTypes } from '../enum/pay-types.enum';
import {
  CreateTicketDto,
  DetailTicket,
} from 'src/tickets/dto/create-ticket.dto';

export class UploadPhotoDto {
  @ApiProperty({
    example: 9,
    description: 'Id del evento al que pertenece',
  })
  @IsNotEmpty()
  event: number;

  @ApiPropertyOptional({
    example: 11,
    description: 'Foto del comprobante',
  })
  @IsOptional()
  photo: any;

  @ApiPropertyOptional({
    example: 11,
    description: 'Total compra actualizado',
  })
  @IsOptional()
  total: any;
}
