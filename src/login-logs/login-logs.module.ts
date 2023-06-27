import { Module } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { LoginLog } from './entities/login-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([LoginLog])
  ],
  providers: [LoginLogsService],
  exports:[LoginLogsService]
})
export class LoginLogsModule {}
