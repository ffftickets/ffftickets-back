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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const user_service_1 = require("../user/user.service");
let LoginLogsService = LoginLogsService_1 = class LoginLogsService {
    constructor(loginLogModel, userService) {
        this.loginLogModel = loginLogModel;
        this.userService = userService;
        this.logger = new common_1.Logger(LoginLogsService_1.name);
    }
    async createLoginLog(createLoginLogDto) {
        try {
            this.logger.log('Creando registro de login');
            const createdLog = new this.loginLogModel(createLoginLogDto);
            return await createdLog.save();
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async countBadLoginLogs(email, lastLogin) {
        try {
            const updatedAt = (await this.userService.findOne({ email })).updatedAt;
            return await this.loginLogModel
                .countDocuments({
                email,
                isCorrect: false,
                createdAt: { $gte: lastLogin },
            })
                .exec();
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
LoginLogsService = LoginLogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('LoginLog')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService])
], LoginLogsService);
exports.LoginLogsService = LoginLogsService;
//# sourceMappingURL=login-logs.service.js.map