import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './config/config.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LicenseModule } from './license/license.module';
import { EventModule } from './event/event.module';
import { EventTypeModule } from './event-type/event-type.module';
import { LocalitiesModule } from './localities/localities.module';
import { DistributionModule } from './distribution/distribution.module';
import { AuthModule } from './auth/auth.module';
import { LoginLogsModule } from './login-logs/login-logs.module';
import { RoleModule } from './role/role.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'mysql',
        host: configService.get(DATABASE_HOST),
        port: configService.get(DATABASE_PORT),
        username: configService.get(DATABASE_USERNAME),
        password: configService.get(DATABASE_PASSWORD),
        database: configService.get(DATABASE_NAME),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    AccessControlModule.forRoles(roles),


    UserModule,

    LicenseModule,

    EventModule,

    EventTypeModule,

    LocalitiesModule,

    DistributionModule,

    AuthModule,

    LoginLogsModule,

    RoleModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
