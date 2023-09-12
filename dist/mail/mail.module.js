"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const config_env_1 = require("../config/config.env");
const mail_logs_module_1 = require("../mail-logs/mail-logs.module");
const firebase_module_1 = require("../firebase/firebase.module");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get(config_env_1.MAIL_HOST),
                        port: configService.get(config_env_1.MAIL_PORT),
                        secure: configService.get(config_env_1.MAIL_SECURE),
                        auth: {
                            user: configService.get(config_env_1.MAIL_USER),
                            pass: configService.get(config_env_1.MAIL_PASS),
                        },
                    },
                    defaults: {
                        from: `"FFF Tickets" <${configService.get(config_env_1.MAIL_USER)}>`,
                    },
                }),
            }),
            mail_logs_module_1.MailLogsModule,
            firebase_module_1.FirebaseModule
        ],
        providers: [mail_service_1.MailService,],
        exports: [mail_service_1.MailService]
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map