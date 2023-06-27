import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { Gender } from 'src/core/enums';
import { UserStatus } from 'src/core/enums/user-status.emun';

export class FindUserDto {
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email del usuario',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: '3716271821001',
    description: 'Identificación del usuario',
  })
  @IsOptional()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(13)

  identification?: string;

  @ApiPropertyOptional({
    example: '3716271821001',
    description: 'Id del usuario',
  })
  @IsOptional()
  id?: number;
}
