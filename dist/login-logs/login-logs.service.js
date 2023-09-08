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
var LoginLogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const login_log_entity_1 = require("./entities/login-log.entity");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const user_service_1 = require("../user/user.service");
let LoginLogsService = LoginLogsService_1 = class LoginLogsService {
    constructor(loginLogRepository, userService) {
        this.loginLogRepository = loginLogRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(LoginLogsService_1.name);
    }
    async createLoginLog(createLoginLogDto) {
        try {
            this.logger.log('Creando registro de login');
            return await this.loginLogRepository.save(createLoginLogDto);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async countBadLoginLogs(email, lastLogin) {
        try {
            const updatedAt = (await this.userService.findOne({ email })).updatedAt;
            return await this.loginLogRepository
                .createQueryBuilder('loginLog')
                .where('loginLog.email = :email', { email })
                .andWhere('loginLog.isCorrect = false')
                .andWhere('loginLog.createdAt >= :lastLogin', { lastLogin })
                .getCount();
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
LoginLogsService = LoginLogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(login_log_entity_1.LoginLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], LoginLogsService);
exports.LoginLogsService = LoginLogsService;
//# sourceMappingURL=login-logs.service.js.map