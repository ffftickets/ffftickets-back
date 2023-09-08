import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SaleStatus } from '../enum/sale-status.enum';
import { PayTypes } from '../enum/pay-types.enum';
import {
  CreateTicketDto,
  DetailTicket,
} from 'src/tickets/dto/create-ticket.dto';
import { CreateLogPayCard } from 'src/log-pay-card/entities/log-pay-card.entity';

export class UpdateSaleCard {


  @ApiPropertyOptional({
    example: '4671628756348179027894321',
    description: 'Numero de autorización del pago',
  })
  @IsString()
  @IsOptional()
  authorizationNumber?: string;

  @ApiPropertyOptional({
    example: '4671628756348179027894321',
    description: 'Numero de transacción',
  })
  @IsString()
  @IsOptional()
  transactionCode?: string;

  @ApiPropertyOptional({
    example: 30,
    description: 'Valor de comisión de la pasarela',
  })
  @IsNumber()
  @IsOptional()
  catwalkCommission?: number;

  @ApiProperty({
    example: {
      "id_transaccion": "10220e91-0758-4457-9d1f-7322c24275a9",
      "token": "707504-230907-049553",
      "amount": 30,
      "cardType": "credit",
      "cardIssuer": "DISCOVER",
      "cardInfo": "6011 76XX XXXX 0843",
      "clientID": "2300687510",
      "clientName": "JONH DOE",
      "state": "PAGADO",
      "fecha": "2023-09-07 16:52:10",
      "acquirer": "DINERS",
      "deferred": 0,
      "interests": "NO",
      "interestValue": 0,
      "amountWoTaxes": "10.00",
      "amountWTaxes": "17.86",
      "taxesValue": "2.14",
      "amountAuthorized": 30,
      "authorizationNumber": "4671628756348179027894321",
      "tipoPago": "TARJETA"
    },
    description: 'Información de la transacción',
  })
  @IsOptional()
  log: CreateLogPayCard;

  sale?: any;

}
