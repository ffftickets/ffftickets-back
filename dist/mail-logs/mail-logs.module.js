"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailLogsModule = void 0;
const common_1 = require("@nestjs/common");
const mail_logs_service_1 = require("./mail-logs.service");
const typeorm_1 = require("@nestjs/typeorm");
const mail_log_entity_1 = require("./entities/mail-log.entity");
let MailLogsModule = class MailLogsModule {
};
MailLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([mail_log_entity_1.MailLog]),
        ],
        providers: [mail_logs_service_1.MailLogsService],
        exports: [mail_logs_service_1.MailLogsService]
    })
], MailLogsModule);
exports.MailLogsModule = MailLogsModule;
//# sourceMappingURL=mail-logs.module.js.map