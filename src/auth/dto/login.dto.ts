import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example:'avillegas7510@gmail.com',
    description: "email del usuario",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:'12345678',
    description:'Contraseña del usuario'
  })
  @ApiProperty()
  @IsString()
  password: string;
}
