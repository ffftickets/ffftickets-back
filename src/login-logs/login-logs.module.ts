import { Module } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { LoginLog } from './entities/login-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([LoginLog]),
    UserModule
  ],
  providers: [LoginLogsService],
  exports:[LoginLogsService]
})
export class LoginLogsModule {}
