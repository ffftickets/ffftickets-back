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
exports.Ticket = void 0;
const localities_entity_1 = require("../../localities/entities/localities.entity");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const typeorm_1 = require("typeorm");
const ticket_status_enum_1 = require("../enum/ticket-status.enum");
const date_fns_tz_1 = require("date-fns-tz");
let Ticket = class Ticket {
    reduce(arg0, arg1) {
        throw new Error('Method not implemented.');
    }
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
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => sale_entity_1.Sale, (sale) => sale.tickets),
    __metadata("design:type", sale_entity_1.Sale)
], Ticket.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => localities_entity_1.Localities, (locality) => locality.ticket),
    __metadata("design:type", localities_entity_1.Localities)
], Ticket.prototype, "locality", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ticket_status_enum_1.TicketStatus,
        default: ticket_status_enum_1.TicketStatus.ACTIVE,
        nullable: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "qr", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "setUpdatedAt", null);
Ticket = __decorate([
    (0, typeorm_1.Entity)('ticket')
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map