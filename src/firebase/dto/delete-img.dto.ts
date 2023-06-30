import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteImg {
  @ApiProperty()
  @IsString()
  image: string;

}
