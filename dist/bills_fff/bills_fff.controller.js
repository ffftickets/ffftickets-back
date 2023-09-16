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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsFffController = void 0;
const common_1 = require("@nestjs/common");
const bills_fff_service_1 = require("./bills_fff.service");
const update_bills_fff_dto_1 = require("./dto/update-bills_fff.dto");
const decorators_1 = require("../common/helpers/decorators");
const swagger_1 = require("@nestjs/swagger");
let BillsFffController = class BillsFffController {
    constructor(billsFffService) {
        this.billsFffService = billsFffService;
    }
    findAll() {
        return this.billsFffService.findAll();
    }
    findOne(id) {
        return this.billsFffService.findOne(+id);
    }
    update(id, updateBillsFffDto) {
    }
    remove(id) {
        return this.billsFffService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillsFffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillsFffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bills_fff_dto_1.UpdateBillsFffDto]),
    __metadata("design:returntype", void 0)
], BillsFffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillsFffController.prototype, "remove", null);
BillsFffController = __decorate([
    (0, swagger_1.ApiTags)('Facturas'),
    (0, decorators_1.Auth)(),
    (0, common_1.Controller)('bills-fff'),
    __metadata("design:paramtypes", [bills_fff_service_1.BillsFffService])
], BillsFffController);
exports.BillsFffController = BillsFffController;
//# sourceMappingURL=bills_fff.controller.js.map