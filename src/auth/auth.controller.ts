import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Logger,
  UseInterceptors,
  UnauthorizedException,
  ForbiddenException,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User as UserEntity } from './../user/entities/user.entity';
import { IpDetailsInterceptor } from 'src/common/interceptors';
import { UserService } from 'src/user/user.service';
import { UserStatus } from 'src/core/enums';
import { Request } from 'express';
import { LoginLogsService } from 'src/login-logs/login-logs.service';
import { LoginSocialNetwork } from './dto/loginSocialNetwork.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { MailService } from 'src/mail/mail.service';
import { MailType } from 'src/license/enums/mail_type.enum';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly loginLogsService: LoginLogsService,
    private readonly encryptionService: EncryptionService,
    private readonly mailService: MailService,
  ) {}
  logger = new Logger(AuthController.name);

  @UseInterceptors(IpDetailsInterceptor)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    loginDto.email = this.encryptionService.encryptData(loginDto.email);
    this.logger.log('Logeando usuario: ', loginDto.email);
    //TODO: GUARDAR LOG DE LOGUEO Y MEJORAR EL CONTROL DE ERRORES DE INICIO DE SESIÓN

    const user = await this.userService.findUserByLogin(loginDto.email);

    if (!user) {
      await this.loginLogsService.createLoginLog({
        ipDetail: req['ip-details'],
        email: loginDto.email,
        blockStatus: 'UNREGISTERED',
        isCorrect: false,
        userAgent: req['ua'],
      });
      this.logger.debug(`El usuario ingresado no existe`);
      throw new UnauthorizedException(`Usuario o contraseña incorrectos`);
    }

    if (user.status == UserStatus.BLOCKED) {
      await this.loginLogsService.createLoginLog({
        ipDetail: req['ip-details'],
        email: loginDto.email,
        blockStatus: 'UNREGISTERED',
        isCorrect: false,
        userAgent: req['ua'],
      });

      if (user.status == UserStatus.BLOCKED) {
        this.logger.debug(`El usuario ${user.email} está bloqueado`);
        throw new ForbiddenException(`Su usuario se encuentra bloqueado`);
      }

      if (user.status == UserStatus.ADMIN_BLOCKED) {
        this.logger.debug(
          `El usuario ${user.email} está bloqueado por el administrador`,
        );
        throw new ForbiddenException(
          `Su cuenta ha sido bloqueada. Por favor comuníquese con servicio el al cliente`,
        );
      }
    }

    if (user && (await compare(loginDto.password, user.password))) {
      await this.loginLogsService.createLoginLog({
        ipDetail: req['ip-details'],
        email: loginDto.email,
        blockStatus: user.status,
        
        isCorrect: true,
        userAgent: req['ua'],
      });
      const { password, ...rest } = user;
      const data = await this.authService.login(user);
      this.mailService.sendLoginEmail({
        email: user.email,
        name: user.name,
        ip: req['ip-details'].query,
        provider: req['ip-details'].isp,
        location: req['ip-details'].city
      });
      return data;
    } else {
      await this.loginLogsService.createLoginLog({
        ipDetail: req['ip-details'],
        email: loginDto.email,
        blockStatus: user.status,
        isCorrect: false,
        userAgent: req['ua'],
      });
      //TODO:Arreglar esta parte

/*       const incorrectLogins = await this.loginLogsService.countBadLoginLogs(
        user.email,
        user.lastLogin >= user.updatedAt ? user.lastLogin : user.updatedAt,
      );

      console.log(incorrectLogins);
      this.logger.debug('Incorrect logins: ' + incorrectLogins);
      const invalidLoginAttempts = 3;

      if (incorrectLogins >= invalidLoginAttempts) {
        this.logger.debug('Bloqueando usuario : ' + user.id);
        const userBloked = await this.userService.blockUser(+user.id);
        throw new ForbiddenException(`Su usuario se encuentra bloqueado`);
      }

      const remainingAttempts = invalidLoginAttempts - incorrectLogins;
      throw new UnauthorizedException(
        `Usuario o contraseña incorrectos, le restan ${Math.max(
          remainingAttempts,
          0,
        )} intentos`,
      ); */
      throw new UnauthorizedException(
        `Usuario o contraseña incorrectos`
      );
    }
  }

  @UseInterceptors(IpDetailsInterceptor)
  @Post('login-social')
  async loginWithSocialNetwork(
    @Body() loginDto: LoginSocialNetwork,
    @Req() req: Request,
  ) {
    this.logger.log('Logeando usuario: ', loginDto.email);
    loginDto.email = this.encryptionService.encryptData(loginDto.email);
    const user = await this.userService.findUserByLogin(loginDto.email);

    if (user.status == UserStatus.BLOCKED) {
      await this.loginLogsService.createLoginLog({
        ipDetail: req['ip-details'],
        email: loginDto.email,
        blockStatus: 'UNREGISTERED',
        
        isCorrect: false,
        userAgent: req['ua'],
      });

      if (user.status == UserStatus.BLOCKED) {
        this.logger.debug(`El usuario ${user.email} está bloqueado`);
        throw new ForbiddenException(`Su usuario se encuentra bloqueado`);
      }

      if (user.status == UserStatus.ADMIN_BLOCKED) {
        this.logger.debug(
          `El usuario ${user.email} está bloqueado por el administrador`,
        );
        throw new ForbiddenException(
          `Su cuenta ha sido bloqueada. Por favor comuníquese con servicio el al cliente`,
        );
      }
    }
    const data = await this.authService.login(user);
    this.loginLogsService.createLoginLog({
      ipDetail: req['ip-details'],
      email: loginDto.email,
      blockStatus: 'SUCCESS_LOGIN',
      isCorrect: false,
      userAgent: req['ua'],
    });
    this.mailService.sendLoginEmail({
      email: user.email,
      name: user.name,
      ip: req['ip-details'].query,
      provider: req['ip-details'].isp,
      location: req['ip-details'].city
    });
    return data;
  }

  @Auth()
  @Get('profile')
  profile(@GetUser() user: UserEntity) {
    this.logger.log('Obteniendo perfil de usuario: ', user.email);
    return user;
  }

  @Auth()
  @Get('refresh')
  refreshToken(@GetUser() user: UserEntity) {
    this.logger.log('Refrescando token user: ', user.email);
    const data = this.authService.login(user);
    return data;
  }
}
