"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSaleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const log_sale_service_1 = require("./log-sale.service");
const log_sale_entity_1 = require("./entities/log-sale.entity");
let LogSaleModule = class LogSaleModule {
};
LogSaleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'LogSale', schema: log_sale_entity_1.LogSaleSchema }]),
        ],
        providers: [log_sale_service_1.LogSaleService],
        exports: [log_sale_service_1.LogSaleService],
    })
], LogSaleModule);
exports.LogSaleModule = LogSaleModule;
//# sourceMappingURL=log-sale.module.js.map