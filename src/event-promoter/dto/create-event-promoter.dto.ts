import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/emuns/enumToString';
import { EventPromoterStatus } from '../emun/status-event.enum';

export class CreateEventPromoterDto {
  @ApiProperty({
    example: 1,
    description: 'Id del event',
  })
  @IsNotEmpty()
  event: any;

  @ApiProperty({
    example: 1,
    description: 'Id del promotor',
  })
  @IsNotEmpty()
  promoter: any;

  @ApiProperty({
    example: 'HUMILDE',
    description: 'Código de descuento',
  })
  @IsNotEmpty()
  code: any;
  
  @ApiPropertyOptional({
    description: 'Estado del evento',
    enum: EventPromoterStatus,
    example: EventPromoterStatus.ACTIVE,
  })
  @IsEnum(EventPromoterStatus)
  status: string;
}
