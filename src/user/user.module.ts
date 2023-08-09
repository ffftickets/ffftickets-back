import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EncryptionModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
