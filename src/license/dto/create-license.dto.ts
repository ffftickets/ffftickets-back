import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateLicenseDto {
  @ApiProperty({
    example: '2023-05-28T02:31:07.313Z',
    description: 'Fecha del inicio de la licencia',
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @ApiProperty({
    example: '2023-05-28T02:31:07.313Z',
    description: 'Fecha de finalización de la licencia',
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @ApiProperty({
    example: 'B. PICHINCHA',
    description: 'Institución bancaria del usuario',
  })
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty({
    example: 'C. CORRIENTE',
    description: 'Tipo de cuenta del usuario',
  })
  @IsNotEmpty()
  @IsString()
  account_type: string;

  @ApiProperty({
    example: '4244323',
    description: 'Numero de cuenta del usuario',
  })
  @IsNotEmpty()
  @IsNumberString()
  account_number: string;

  @ApiProperty({
    example: 'hhtp://url',
    description: 'URL del documento',
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    example: '1',
    description: 'Id del usuario a quien se le emite la licencia',
  })
  @IsNotEmpty()
  user: any;

  userAdmin:any;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado actividad del usuario',
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
