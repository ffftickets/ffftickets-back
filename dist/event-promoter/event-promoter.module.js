"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPromoterModule = void 0;
const common_1 = require("@nestjs/common");
const event_promoter_service_1 = require("./event-promoter.service");
const event_promoter_controller_1 = require("./event-promoter.controller");
const typeorm_1 = require("@nestjs/typeorm");
const event_promoter_entity_1 = require("./entities/event-promoter.entity");
const passport_1 = require("@nestjs/passport");
let EventPromoterModule = class EventPromoterModule {
};
EventPromoterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_promoter_entity_1.EventPromoter]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [event_promoter_controller_1.EventPromoterController],
        providers: [event_promoter_service_1.EventPromoterService]
    })
], EventPromoterModule);
exports.EventPromoterModule = EventPromoterModule;
//# sourceMappingURL=event-promoter.module.js.map