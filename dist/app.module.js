"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("./app.roles");
const config_1 = require("@nestjs/config");
const config_env_1 = require("./config/config.env");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const license_module_1 = require("./license/license.module");
const event_module_1 = require("./event/event.module");
const event_type_module_1 = require("./event-type/event-type.module");
const localities_module_1 = require("./localities/localities.module");
const auth_module_1 = require("./auth/auth.module");
const login_logs_module_1 = require("./login-logs/login-logs.module");
const role_module_1 = require("./role/role.module");
const invitation_module_1 = require("./invitation/invitation.module");
const sales_module_1 = require("./sales/sales.module");
const tickets_module_1 = require("./tickets/tickets.module");
const coupon_module_1 = require("./coupon/coupon.module");
const event_promoter_module_1 = require("./event-promoter/event-promoter.module");
const free_tickets_module_1 = require("./free-tickets/free-tickets.module");
const encryption_module_1 = require("./encryption/encryption.module");
const mail_module_1 = require("./mail/mail.module");
const mail_logs_module_1 = require("./mail-logs/mail-logs.module");
const log_pay_card_module_1 = require("./log-pay-card/log-pay-card.module");
const log_sale_module_1 = require("./log-sale/log-sale.module");
const mongoose_1 = require("@nestjs/mongoose");
const amazon_s3_module_1 = require("./amazon-s3/amazon-s3.module");
const bills_fff_module_1 = require("./bills_fff/bills_fff.module");
const bill_logs_module_1 = require("./bill_logs/bill_logs.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [config_env_1.default] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get(config_env_1.DATABASE_HOST),
                    port: configService.get(config_env_1.DATABASE_PORT),
                    username: configService.get(config_env_1.DATABASE_USERNAME),
                    password: configService.get(config_env_1.DATABASE_PASSWORD),
                    database: configService.get(config_env_1.DATABASE_NAME),
                    synchronize: true,
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        uri: configService.get(config_env_1.MONGODB_URI),
                    };
                },
            }),
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            user_module_1.UserModule,
            license_module_1.LicenseModule,
            event_module_1.EventModule,
            event_type_module_1.EventTypeModule,
            localities_module_1.LocalitiesModule,
            auth_module_1.AuthModule,
            login_logs_module_1.LoginLogsModule,
            role_module_1.RoleModule,
            invitation_module_1.InvitationModule,
            sales_module_1.SalesModule,
            tickets_module_1.TicketsModule,
            coupon_module_1.CouponModule,
            event_promoter_module_1.EventPromoterModule,
            free_tickets_module_1.FreeTicketsModule,
            encryption_module_1.EncryptionModule,
            mail_module_1.MailModule,
            mail_logs_module_1.MailLogsModule,
            log_pay_card_module_1.LogPayCardModule,
            log_sale_module_1.LogSaleModule,
            amazon_s3_module_1.AmazonS3Module,
            bills_fff_module_1.BillsFffModule,
            bill_logs_module_1.BillLogsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map