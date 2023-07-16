import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginSocialNetwork {
  @ApiProperty({
    example:'avillegas7510@gmail.com',
    description: "email del usuario",
  })
  @IsEmail()
  email: string;


}
