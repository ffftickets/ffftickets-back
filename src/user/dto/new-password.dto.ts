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

export class NewPasswordDto {
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email del usuario',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: 'dgreaghyerdtgare',
    description: 'Contraseña actual',
  })
  @IsOptional()
  oldPassword?: string;

  @ApiPropertyOptional({
    example: 'wf4e3rfewrfert',
    description: 'Nueva contraseña',
  })
  @IsOptional()
  newPassword?: string;
}
