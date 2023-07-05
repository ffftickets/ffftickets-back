import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../enum/ticket-status.enum';

export class DetailTicket {
  quantity: number;
  locality: number;
}

export class CreateTicketDto {
  @ApiProperty({
    example: 1,
    description: 'Id del la venta',
  })
  @IsNotEmpty()
  sale: any;

  @ApiProperty({
    example: {
      quantity: 1,
      locality: 1,
    },
    description: 'Id de la localidad',
  })
  @IsNotEmpty()
  detail: DetailTicket[];
}
