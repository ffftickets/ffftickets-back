import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

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
    example: '12/01/2022',
    description: 'Fecha del evento',
  })
  @IsNotEmpty()
  @IsString()
  eventDate: Date;

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
    example: '9 de octubre',
    description: 'Dirección del evento',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    example: '-12.12,13.2',
    description: 'Geo location del evento',
  })
  @IsNotEmpty()
  @IsString()
  geoLocation: string;

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
  imgTicket?: string;

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
  municipalAuthorization?: string;

  @ApiPropertyOptional({
    example: '563231523332',
    description: 'Autorización de emisión',
  })
  @IsOptional()
  @IsNumberString()
  issuanceAuthorization?: string;

  @ApiPropertyOptional({
    example: '31234124312',
    description: 'Autorización de aforo',
  })
  @IsOptional()
  @IsNumberString()
  capacityAuthorization?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado del evento',
  })
  @IsOptional()
  @IsNumberString()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 'Publico',
    description: 'Tipo de evento',
  })
  @IsOptional()
  eventType: any;
}
