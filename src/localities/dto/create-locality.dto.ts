import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LocaliteStatus } from '../enum/localite-status.enum';

export class CreateLocalityDto {
  @ApiPropertyOptional({
    example: 3,
    description: 'Id del evento al que pertenece',
  })
  @IsOptional()
  event?: any;

  @ApiProperty({
    example: 'VIP',
    description: 'Nombre de la localidad',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 20,
    description: 'Precio de la localidad',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Capacidad de la localidad',
  })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiPropertyOptional({
    example: 90,
    description: 'Numero de entradas vendidas',
  })
  @IsNumber()
  @IsOptional()
  sold?: number;

  @ApiPropertyOptional({
    example: 'imgBase64 / URL',
    description: 'Imagen de la localidad',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    example: LocaliteStatus.ACTIVE,
    description: 'Estado de la localidad',
    enum: LocaliteStatus,
  })
  @IsOptional()
  @IsString()
  @IsEnum(LocaliteStatus)
  status: string;

  @ApiPropertyOptional({
    example: 12.3,
    description: 'Valor del iva',
  })
  @IsNumber()
  iva: number;

  @ApiPropertyOptional({
    example:20,
    description: 'Total',
  })
  @IsNumber()
  total: number;


}
