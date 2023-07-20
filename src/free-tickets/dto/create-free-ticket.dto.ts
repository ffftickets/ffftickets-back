import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFreeTicketDto {
    
  @ApiProperty({
    example: {
      locality: 1,
    },
    description: 'Id de la localidad',
  })
  @IsNotEmpty()
  locality: any;

  user: any;
}
