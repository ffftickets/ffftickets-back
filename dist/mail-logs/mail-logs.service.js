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
var MailLogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailLogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MailLogsService = MailLogsService_1 = class MailLogsService {
    constructor(mailLogModel) {
        this.mailLogModel = mailLogModel;
        this.logger = new common_1.Logger(MailLogsService_1.name);
    }
    async create(mailLog) {
        this.logger.log('Creando log: ', mailLog.receiver);
        try {
            const createdLog = new this.mailLogModel(mailLog);
            return await createdLog.save();
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
};
MailLogsService = MailLogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('MailLog')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MailLogsService);
exports.MailLogsService = MailLogsService;
//# sourceMappingURL=mail-logs.service.js.map