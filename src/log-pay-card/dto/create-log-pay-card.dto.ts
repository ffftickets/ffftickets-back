
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IpDetail, UserAgentDto } from 'src/login-logs/dto';

export class CreateLogPayCardDto {
  @ApiProperty({
    example: '10220e91-0758-4457-9d1f-7322c24275a9',
    description: 'ID de la transacción',
  })
  @IsNotEmpty()
  id_transaccion: string;

  @ApiProperty({
    example: '707504-230907-049553',
    description: 'Token de la transacción',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 30,
    description: 'Monto de la transacción',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'credit',
    description: 'Tipo de tarjeta (credit/debit)',
  })
  @IsString()
  cardType: string;

  @ApiProperty({
    example: 'DISCOVER',
    description: 'Emisor de la tarjeta',
  })
  @IsString()
  cardIssuer: string;

  @ApiProperty({
    example: '6011 76XX XXXX 0843',
    description: 'Información de la tarjeta',
  })
  @IsString()
  cardInfo: string;

  @ApiProperty({
    example: '2300687510',
    description: 'ID del cliente',
  })
  @IsString()
  clientID: string;

  @ApiProperty({
    example: 'JONH DOE',
    description: 'Nombre del cliente',
  })
  @IsString()
  clientName: string;

  @ApiProperty({
    example: 'PAGADO',
    description: 'Estado de la transacción',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: '2023-09-07 16:52:10',
    description: 'Fecha de la transacción',
  })
  @IsString()
  fecha: string;

  @ApiProperty({
    example: 'DINERS',
    description: 'Adquirente de la tarjeta',
  })
  @IsString()
  acquirer: string;

  @ApiProperty({
    example: 0,
    description: 'Diferido',
  })
  @IsNumber()
  deferred: number;

  @ApiProperty({
    example: 'NO',
    description: 'Intereses',
  })
  @IsString()
  interests: string;

  @ApiProperty({
    example: 0,
    description: 'Valor de intereses',
  })
  @IsNumber()
  interestValue: number;

  @ApiProperty({
    example: '10.00',
    description: 'Monto sin impuestos',
  })
  @IsString()
  amountWoTaxes: string;

  @ApiProperty({
    example: '17.86',
    description: 'Monto con impuestos',
  })
  @IsString()
  amountWTaxes: string;

  @ApiProperty({
    example: '2.14',
    description: 'Valor de impuestos',
  })
  @IsString()
  taxesValue: string;

  @ApiProperty({
    example: 30,
    description: 'Monto autorizado',
  })
  @IsNumber()
  amountAuthorized: number;

  @ApiPropertyOptional({
    example: '4671628756348179027894321',
    description: 'Numero de autorización del pago',
  })
  @IsString()
  @IsOptional()
  authorizationNumber?: string;

  @ApiProperty({
    example: 'TARJETA',
    description: 'Tipo de pago',
  })
  @IsString()
  tipoPago: string;

  
  ipDetail?: IpDetail;
  userAgent?: UserAgentDto;
  sale:any;

}

