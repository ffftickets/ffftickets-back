import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../enum/ticket-status.enum';

export class CreateTicketDto {
  @ApiProperty({
    example: 1,
    description: 'Id del la venta',
  })
  @IsNotEmpty()
  sale: any;

  @ApiProperty({
    example: 1,
    description: 'Id de la localidad',
  })
  @IsNotEmpty()
  locality: any;

  @ApiProperty({
    example: 'VIP',
    description: 'Nombre de la localidad',
  })
  @IsNotEmpty()
  @IsString()
  localityName: string;

  @ApiProperty({
    example: 'NF FEST',
    description: 'Nombre del evento',
  })
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @ApiProperty({
    example: 20,
    description: 'Precio del ticket',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: TicketStatus.ACTIVE,
    description: 'Nombre de la localidad',
    enum: TicketStatus,
  })
  @IsEnum(TicketStatus)
  status: string;

  

  qr?: string;
}
