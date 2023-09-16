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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsFff = void 0;
const typeorm_1 = require("typeorm");
const status_bill_dto_1 = require("../enums/status-bill.dto");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const date_fns_tz_1 = require("date-fns-tz");
let BillsFff = class BillsFff {
    setCreatedAt() {
        const zonaHorariaEcuador = 'America/Guayaquil';
        const fechaActualUTC = new Date();
        const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
        this.createdAt = fechaActualEcuador;
        this.updatedAt = fechaActualEcuador;
    }
    setUpdatedAt() {
        const zonaHorariaEcuador = 'America/Guayaquil';
        const fechaActualUTC = new Date();
        const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
        this.updatedAt = fechaActualEcuador;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BillsFff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => sale_entity_1.Sale, (sale) => sale.bill),
    __metadata("design:type", sale_entity_1.Sale)
], BillsFff.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BillsFff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], BillsFff.prototype, "identification", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], BillsFff.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], BillsFff.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BillsFff.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BillsFff.prototype, "total_o", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BillsFff.prototype, "iva_o", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BillsFff.prototype, "total_fff", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BillsFff.prototype, "iva_fff", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BillsFff.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: status_bill_dto_1.StatusBill, default: status_bill_dto_1.StatusBill.PENDING }),
    __metadata("design:type", String)
], BillsFff.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BillsFff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BillsFff.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillsFff.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillsFff.prototype, "setUpdatedAt", null);
BillsFff = __decorate([
    (0, typeorm_1.Entity)('bills_fff')
], BillsFff);
exports.BillsFff = BillsFff;
//# sourceMappingURL=bills_fff.entity.js.map