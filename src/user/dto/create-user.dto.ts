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
  IsArray,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/emuns/enumToString';
import { Gender } from 'src/core/enums';
import { UserStatus } from 'src/core/enums/user-status.emun';
import { IdentificationType } from '../emun/identification-type.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña del usuario',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'Oscar Parraga',
    description: 'Nombre del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  name: string;

  @ApiProperty({
    example: '0974631312',
    description: 'Teléfono del usuario',
  })
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(10)
  phone: string;

 

  @ApiProperty({
    example: '3716271821001',
    description: 'Identificación del usuario',
  })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(13)
  identification: string;

  @ApiPropertyOptional({
    example: 'Tungurahua',
    description: 'Provincia del usuario',
  })
  @IsOptional()
  @IsString()
  @MaxLength(35)
  province?: string;

  @ApiPropertyOptional({
    example: 'Ambato',
    description: 'Ciudad del usuario',
  })
  @IsOptional()
  @IsString()
  @MaxLength(35)
  city?: string;

  @ApiPropertyOptional({
    example: 'Ambato',
    description: 'Dirección del usuario',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @ApiPropertyOptional({
    example: 'http://',
    description: 'Foto del usuario',
  })
  @IsOptional()
  @IsString()
  photo?: string;


  @ApiPropertyOptional({
    type: [],
    description: 'Roles del usuario',
    enum: AppRoles,
    example: AppRoles.CUSTOMER,
  })
  @IsOptional()
  @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, ${EnumToString(AppRoles)}`,
  })
  roles: string[];

  @ApiProperty({
    example: IdentificationType.CEDULA,
    description: 'Tipo de identificación',
    enum: IdentificationType,
  })
  @IsString()
  @IsEnum(IdentificationType)
  identificationType: string;

  @ApiPropertyOptional({
    example: UserStatus.ACTIVE,
    description: 'Estado del usuario',
    enum: UserStatus,
  })
  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado actividad del usuario',
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Aceptación de términos y condiciones',
  })
  @IsOptional()
  @IsBoolean()
  terms?: boolean;

  @ApiPropertyOptional({
    example: '2023-05-28T02:31:07.313Z',
    description: 'Fecha del cumpleaños del usuario',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({
    example: Gender.MASCULINO,
    description: 'Genero del usuario',
    enum: Gender,
  })
  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  gender: string;
}
