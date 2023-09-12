import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User as UserEntity } from './../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { LoginLogsService } from 'src/login-logs/login-logs.service';
import { LoginSocialNetwork } from './dto/loginSocialNetwork.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { MailService } from 'src/mail/mail.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly loginLogsService;
    private readonly encryptionService;
    private readonly mailService;
    constructor(authService: AuthService, userService: UserService, loginLogsService: LoginLogsService, encryptionService: EncryptionService, mailService: MailService);
    logger: Logger;
    login(loginDto: LoginDto, req: Request): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    loginWithSocialNetwork(loginDto: LoginSocialNetwork, req: Request): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    profile(user: UserEntity): UserEntity;
    refreshToken(user: UserEntity): {
        user: UserEntity;
        accessToken: string;
    };
}
