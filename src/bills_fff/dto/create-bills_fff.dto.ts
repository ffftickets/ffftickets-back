
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumberString, IsOptional } from 'class-validator';

import { StatusBill } from '../enums/status-bill.dto';

export class CreateBillsFffDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre del cliente',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de identificación del cliente',
  })
  @IsNumberString()
  identification: string;

  @ApiProperty({
    example: '123 Main St, City',
    description: 'Dirección del cliente',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '555-555-5555',
    description: 'Número de teléfono del cliente',
  })
  @IsNumberString()
  phone: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Correo electrónico del cliente',
  })
  @IsEmail()
  email: string;

  total_o?: number;
  iva_o?: number;
  total_fff?: number;
  iva_fff?: number;
  total?: number;
  status?: StatusBill;
  sale?: any;
}
