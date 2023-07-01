import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SaleStatus } from '../enum/sale-status.emun';
import { PayTypes } from '../enum/pay-types.emun';

export class CreateSaleDto {
  @ApiProperty({
    example: 1,
    description: 'Id del evento al que pertenece',
  })
  @IsNotEmpty()
  event: any;

  @ApiProperty({
    example: 1,
    description: 'Id del organizador',
  })
  @IsNotEmpty()
  organizer: any;

  @ApiPropertyOptional({
    example: 1,
    description: 'Id del promotor',
  })
  @IsOptional()
  promoter: any;

  @ApiProperty({
    example: 1,
    description: 'Id del usuario de compro la localidad',
  })
  @IsNotEmpty()
  customer: any;


  @ApiProperty({
    example: PayTypes.DEBIT_CARD,
    description: 'Nombre de la localidad',
    enum: SaleStatus,
  })
  @IsEnum(PayTypes)
  payType: string;

  @ApiProperty({
    example: SaleStatus.SOLD,
    description: 'Nombre de la localidad',
    enum: SaleStatus,
  })
  @IsEnum(SaleStatus)
  status: string;

  @ApiPropertyOptional({
    example: "4671628756348179027894321",
    description: 'Numero de autorización del pago',
  })
  @IsNumberString()
  @IsOptional()
  authorizationNumber?: string;

  @ApiPropertyOptional({
    example: "4671628756348179027894321",
    description: 'Numero de transacción',
  })
  @IsNumberString()
  @IsOptional()
  transactionCode?: string;

  @ApiProperty({
    example: 30,
    description: 'Valor del servicio',
  })
  @IsNumber()
  @IsNotEmpty()
  serviceValue: number;

  @ApiProperty({
    example: 30,
    description: 'Valor de comisión de la pasarela',
  })
  @IsNumber()
  @IsNotEmpty()
  catwalkCommission: number;

  @ApiProperty({
    example: 40,
    description: 'Valor total cobrado',
  })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  qr: string;
}
