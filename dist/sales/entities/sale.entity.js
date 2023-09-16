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
exports.Sale = void 0;
const typeorm_1 = require("typeorm");
const pay_types_enum_1 = require("../enum/pay-types.enum");
const sale_status_enum_1 = require("../enum/sale-status.enum");
const event_entity_1 = require("../../event/entities/event.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const bills_fff_entity_1 = require("../../bills_fff/entities/bills_fff.entity");
let Sale = class Sale {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.sale),
    __metadata("design:type", event_entity_1.Event)
], Sale.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entity_1.User, (user) => user.salePromoter),
    __metadata("design:type", user_entity_1.User)
], Sale.prototype, "promoter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entity_1.User, (user) => user.saleCustomer),
    __metadata("design:type", Object)
], Sale.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: pay_types_enum_1.PayTypes, nullable: false }),
    __metadata("design:type", String)
], Sale.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: sale_status_enum_1.SaleStatus,
        default: sale_status_enum_1.SaleStatus.SOLD,
        nullable: false,
    }),
    __metadata("design:type", String)
], Sale.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "authorizationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "transactionCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "transfer_photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "serviceValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "catwalkCommission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "promoterDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 1 }),
    __metadata("design:type", Number)
], Sale.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => ticket_entity_1.Ticket, (ticket) => ticket.sale),
    __metadata("design:type", ticket_entity_1.Ticket)
], Sale.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Sale.prototype, "authorization_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Sale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Sale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => bills_fff_entity_1.BillsFff, (bill) => bill.sale),
    __metadata("design:type", bills_fff_entity_1.BillsFff)
], Sale.prototype, "bill", void 0);
Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map