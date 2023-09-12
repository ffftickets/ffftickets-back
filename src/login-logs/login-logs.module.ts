import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginLogsService } from './login-logs.service';
import { UserModule } from 'src/user/user.module';
import { LoginLogSchema } from './entities/login-log.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LoginLog', schema: LoginLogSchema }]), // Configura el modelo y el esquema de MongoDB
    UserModule,
  ],
  providers: [LoginLogsService],
  exports: [LoginLogsService],
})
export class LoginLogsModule {}
