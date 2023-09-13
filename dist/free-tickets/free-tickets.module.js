"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeTicketsModule = void 0;
const common_1 = require("@nestjs/common");
const free_tickets_service_1 = require("./free-tickets.service");
const free_tickets_controller_1 = require("./free-tickets.controller");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const free_ticket_entity_1 = require("./entities/free-ticket.entity");
const localities_module_1 = require("../localities/localities.module");
const user_module_1 = require("../user/user.module");
const event_module_1 = require("../event/event.module");
let FreeTicketsModule = class FreeTicketsModule {
};
FreeTicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([free_ticket_entity_1.FreeTicket]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            user_module_1.UserModule,
            localities_module_1.LocalitiesModule,
            event_module_1.EventModule
        ],
        controllers: [free_tickets_controller_1.FreeTicketsController],
        providers: [free_tickets_service_1.FreeTicketsService],
        exports: [free_tickets_service_1.FreeTicketsService]
    })
], FreeTicketsModule);
exports.FreeTicketsModule = FreeTicketsModule;
//# sourceMappingURL=free-tickets.module.js.map