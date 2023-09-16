"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsFffModule = void 0;
const common_1 = require("@nestjs/common");
const bills_fff_service_1 = require("./bills_fff.service");
const bills_fff_controller_1 = require("./bills_fff.controller");
const typeorm_1 = require("@nestjs/typeorm");
const bills_fff_entity_1 = require("./entities/bills_fff.entity");
let BillsFffModule = class BillsFffModule {
};
BillsFffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([bills_fff_entity_1.BillsFff]),
        ],
        controllers: [bills_fff_controller_1.BillsFffController],
        providers: [bills_fff_service_1.BillsFffService],
        exports: [bills_fff_service_1.BillsFffService]
    })
], BillsFffModule);
exports.BillsFffModule = BillsFffModule;
//# sourceMappingURL=bills_fff.module.js.map