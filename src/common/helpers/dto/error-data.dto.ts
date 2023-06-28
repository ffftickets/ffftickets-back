import { ApiProperty } from '@nestjs/swagger';

export class ErrorData {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
