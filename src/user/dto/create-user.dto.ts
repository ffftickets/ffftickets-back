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
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;

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

  @ApiProperty({
    example: 'Tungurahua',
    description: 'Provincia del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  province: string;

  @ApiProperty({
    example: 'Ambato',
    description: 'Ciudad del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  city: string;

  @ApiProperty({
    example: 'Ambato',
    description: 'Dirección del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

  @ApiPropertyOptional({
    example: AppRoles.CUSTOMER,
    description: 'Rol del usuario',
    enum: AppRoles,
  })
  @ApiPropertyOptional({
    type: [],
    description: 'Roles del usuario',
    enum: AppRoles,
    example: AppRoles.CUSTOMER,
  })
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
  IdentificationType: string;

  @ApiPropertyOptional({
    example: UserStatus.ACTIVE,
    description: 'Estado del usuario',
    enum: UserStatus,
  })
  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status: string;

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

  @ApiProperty({
    example: '2023-05-28T02:31:07.313Z',
    description: 'Fecha del cumpleaños del usuario',
  })
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiProperty({
    example: Gender.MASCULINO,
    description: 'Genero del usuario',
    enum: Gender,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: string;
}
