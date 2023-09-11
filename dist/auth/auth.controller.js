"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const decorators_1 = require("../common/helpers/decorators");
const user_entity_1 = require("./../user/entities/user.entity");
const interceptors_1 = require("../common/interceptors");
const user_service_1 = require("../user/user.service");
const enums_1 = require("../core/enums");
const login_logs_service_1 = require("../login-logs/login-logs.service");
const loginSocialNetwork_dto_1 = require("./dto/loginSocialNetwork.dto");
const encryption_service_1 = require("../encryption/encryption.service");
const mail_service_1 = require("../mail/mail.service");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, userService, loginLogsService, encryptionService, mailService) {
        this.authService = authService;
        this.userService = userService;
        this.loginLogsService = loginLogsService;
        this.encryptionService = encryptionService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(loginDto, req) {
        loginDto.email = this.encryptionService.encryptData(loginDto.email);
        this.logger.log('Logeando usuario: ', loginDto.email);
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
            throw new common_1.UnauthorizedException(`Usuario o contraseña incorrectos`);
        }
        if (user.status == enums_1.UserStatus.BLOCKED) {
            await this.loginLogsService.createLoginLog({
                ipDetail: req['ip-details'],
                email: loginDto.email,
                blockStatus: 'UNREGISTERED',
                isCorrect: false,
                userAgent: req['ua'],
            });
            if (user.status == enums_1.UserStatus.BLOCKED) {
                this.logger.debug(`El usuario ${user.email} está bloqueado`);
                throw new common_1.ForbiddenException(`Su usuario se encuentra bloqueado`);
            }
            if (user.status == enums_1.UserStatus.ADMIN_BLOCKED) {
                this.logger.debug(`El usuario ${user.email} está bloqueado por el administrador`);
                throw new common_1.ForbiddenException(`Su cuenta ha sido bloqueada. Por favor comuníquese con servicio el al cliente`);
            }
        }
        if (user && (await (0, bcryptjs_1.compare)(loginDto.password, user.password))) {
            await this.loginLogsService.createLoginLog({
                ipDetail: req['ip-details'],
                email: loginDto.email,
                blockStatus: user.status,
                isCorrect: true,
                userAgent: req['ua'],
            });
            const { password } = user, rest = __rest(user, ["password"]);
            const data = await this.authService.login(user);
            this.mailService.sendLoginEmail({
                email: user.email,
                name: user.name,
                ip: req['ip-details'].query,
            });
            return data;
        }
        else {
            await this.loginLogsService.createLoginLog({
                ipDetail: req['ip-details'],
                email: loginDto.email,
                blockStatus: user.status,
                isCorrect: false,
                userAgent: req['ua'],
            });
            throw new common_1.UnauthorizedException(`Usuario o contraseña incorrectos`);
        }
    }
    async loginWithSocialNetwork(loginDto, req) {
        this.logger.log('Logeando usuario: ', loginDto.email);
        loginDto.email = this.encryptionService.encryptData(loginDto.email);
        const user = await this.userService.findUserByLogin(loginDto.email);
        if (user.status == enums_1.UserStatus.BLOCKED) {
            await this.loginLogsService.createLoginLog({
                ipDetail: req['ip-details'],
                email: loginDto.email,
                blockStatus: 'UNREGISTERED',
                isCorrect: false,
                userAgent: req['ua'],
            });
            if (user.status == enums_1.UserStatus.BLOCKED) {
                this.logger.debug(`El usuario ${user.email} está bloqueado`);
                throw new common_1.ForbiddenException(`Su usuario se encuentra bloqueado`);
            }
            if (user.status == enums_1.UserStatus.ADMIN_BLOCKED) {
                this.logger.debug(`El usuario ${user.email} está bloqueado por el administrador`);
                throw new common_1.ForbiddenException(`Su cuenta ha sido bloqueada. Por favor comuníquese con servicio el al cliente`);
            }
        }
        const data = await this.authService.login(user);
        this.mailService.sendLoginEmail({
            email: user.email,
            name: user.name,
            ip: req['ip-details'].query,
        });
        return data;
    }
    profile(user) {
        this.logger.log('Obteniendo perfil de usuario: ', user.email);
        return user;
    }
    refreshToken(user) {
        this.logger.log('Refrescando token user: ', user.email);
        const data = this.authService.login(user);
        return data;
    }
};
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Post)('login-social'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginSocialNetwork_dto_1.LoginSocialNetwork, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginWithSocialNetwork", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('refresh'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        login_logs_service_1.LoginLogsService,
        encryption_service_1.EncryptionService,
        mail_service_1.MailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map