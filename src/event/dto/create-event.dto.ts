import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventStatus } from '../emun/status-event.enum';

export class CreateEventDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Id del usuario creador del evento',
  })
  @IsOptional()
  user: any;

  @ApiProperty({
    example: 'NH Fest Hallowen',
    description: 'Nombre del evento',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '2023-06-29 05:13:55',
    description: 'Fecha del evento',
  })
  @IsNotEmpty()
  @IsString()
  event_date: Date;

  @ApiProperty({
    example: '12:00',
    description: 'Hora del evento',
  })
  @IsNotEmpty()
  @IsString()
  hour: string;

  @ApiProperty({
    example: 'Ambato',
    description: 'Ciudad del evento',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Tungurahua',
    description: 'Provincia del evento',
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    example: '9 de octubre',
    description: 'Dirección del evento',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '-12.12,13.2',
    description: 'Geo location del evento',
  })
  @IsNotEmpty()
  @IsString()
  geo_location: string;

  @ApiProperty({
    example: 'http:url',
    description: 'Url del poster ',
  })
  @IsOptional()
  @IsString()
  poster?: any;

  @ApiProperty({
    example: 'http:url',
    description: 'Url de la imagen del ticket ',
  })
  @IsOptional()
  @IsString()
  courtesy_ticket?: string;

  @ApiPropertyOptional({
    type: [],
    description: 'Galería informativa del evento',
  })
  @IsOptional()
  informative_gallery?: any[];

  @ApiPropertyOptional({ type: [], description: 'Galeria del evento' })
  @IsOptional()
  event_gallery?: any[];

  @ApiPropertyOptional({
    example: '2300687510',
    description: 'Ruc del organizador del evento',
  })
  @IsOptional()
  @IsNumberString()
  ruc?: string;

  @ApiPropertyOptional({
    example: '41214124122',
    description: 'Autorización municipal',
  })
  @IsOptional()
  @IsNumberString()
  municipal_authorization?: string;

  @ApiPropertyOptional({
    example: '563231523332',
    description: 'Autorización de emisión',
  })
  @IsOptional()
  @IsNumberString()
  issuance_authorization?: string;

  @ApiPropertyOptional({
    example: '31234124312',
    description: 'Autorización de aforo',
  })
  @IsOptional()
  @IsNumberString()
  capacity_authorization?: string;

 
  @ApiPropertyOptional({
    example: 'ACTIVE',
    description: 'Estado del evento',
    enum: EventStatus,
  })
  @IsOptional()
  @IsString()
  @IsEnum(EventStatus)
  status: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado del evento',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Id tipo de evento',
  })
  @IsNumber()
  event_type: any;


  @ApiPropertyOptional({
    type: [],
    description: 'Eventos pasados',
  })
  @IsOptional()
  past_events?: any[];
}
