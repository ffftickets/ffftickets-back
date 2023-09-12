"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const sales_controller_1 = require("./sales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const sale_entity_1 = require("./entities/sale.entity");
const passport_1 = require("@nestjs/passport");
const event_module_1 = require("../event/event.module");
const user_module_1 = require("../user/user.module");
const tickets_module_1 = require("../tickets/tickets.module");
const localities_module_1 = require("../localities/localities.module");
const log_pay_card_module_1 = require("../log-pay-card/log-pay-card.module");
const mail_module_1 = require("../mail/mail.module");
const log_sale_module_1 = require("../log-sale/log-sale.module");
let SalesModule = class SalesModule {
};
SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sale_entity_1.Sale]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            event_module_1.EventModule,
            user_module_1.UserModule,
            tickets_module_1.TicketsModule,
            localities_module_1.LocalitiesModule,
            log_pay_card_module_1.LogPayCardModule,
            mail_module_1.MailModule,
            log_sale_module_1.LogSaleModule
        ],
        controllers: [sales_controller_1.SalesController],
        providers: [sales_service_1.SalesService],
        exports: [sales_service_1.SalesService]
    })
], SalesModule);
exports.SalesModule = SalesModule;
//# sourceMappingURL=sales.module.js.map