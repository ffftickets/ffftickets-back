
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateEventTypeDto {
  @ApiProperty({
    example: 'Publico',
    description: 'Nombre del tipo de evento',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Estado del tipo de evento',
  })
  @IsOptional()
  @IsString()
  isActive?: boolean;


}
