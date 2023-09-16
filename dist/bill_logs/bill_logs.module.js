"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillLogsModule = void 0;
const common_1 = require("@nestjs/common");
const bill_logs_service_1 = require("./bill_logs.service");
const bill_logs_controller_1 = require("./bill_logs.controller");
let BillLogsModule = class BillLogsModule {
};
BillLogsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bill_logs_controller_1.BillLogsController],
        providers: [bill_logs_service_1.BillLogsService]
    })
], BillLogsModule);
exports.BillLogsModule = BillLogsModule;
//# sourceMappingURL=bill_logs.module.js.map