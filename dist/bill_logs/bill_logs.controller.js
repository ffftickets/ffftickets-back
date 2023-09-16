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
exports.BillLogsController = void 0;
const common_1 = require("@nestjs/common");
const bill_logs_service_1 = require("./bill_logs.service");
const create_bill_log_dto_1 = require("./dto/create-bill_log.dto");
const update_bill_log_dto_1 = require("./dto/update-bill_log.dto");
let BillLogsController = class BillLogsController {
    constructor(billLogsService) {
        this.billLogsService = billLogsService;
    }
    create(createBillLogDto) {
        return this.billLogsService.create(createBillLogDto);
    }
    findAll() {
        return this.billLogsService.findAll();
    }
    findOne(id) {
        return this.billLogsService.findOne(+id);
    }
    update(id, updateBillLogDto) {
        return this.billLogsService.update(+id, updateBillLogDto);
    }
    remove(id) {
        return this.billLogsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_log_dto_1.CreateBillLogDto]),
    __metadata("design:returntype", void 0)
], BillLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bill_log_dto_1.UpdateBillLogDto]),
    __metadata("design:returntype", void 0)
], BillLogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillLogsController.prototype, "remove", null);
BillLogsController = __decorate([
    (0, common_1.Controller)('bill-logs'),
    __metadata("design:paramtypes", [bill_logs_service_1.BillLogsService])
], BillLogsController);
exports.BillLogsController = BillLogsController;
//# sourceMappingURL=bill_logs.controller.js.map