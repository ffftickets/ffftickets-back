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
exports.Localities = void 0;
const event_entity_1 = require("../../event/entities/event.entity");
const typeorm_1 = require("typeorm");
const localite_status_enum_1 = require("../enum/localite-status.enum");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const free_ticket_entity_1 = require("../../free-tickets/entities/free-ticket.entity");
let Localities = class Localities {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Localities.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.localities),
    __metadata("design:type", event_entity_1.Event)
], Localities.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => free_ticket_entity_1.FreeTicket, (free) => free.locality),
    __metadata("design:type", free_ticket_entity_1.FreeTicket)
], Localities.prototype, "free_ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Localities.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Localities.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Localities.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Localities.prototype, "sold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Localities.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: localite_status_enum_1.LocaliteStatus,
        default: localite_status_enum_1.LocaliteStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Localities.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Localities.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Localities.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Localities.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => ticket_entity_1.Ticket, (ticket) => ticket.locality),
    __metadata("design:type", ticket_entity_1.Ticket)
], Localities.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Localities.prototype, "iva", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Localities.prototype, "total", void 0);
Localities = __decorate([
    (0, typeorm_1.Entity)('localities')
], Localities);
exports.Localities = Localities;
//# sourceMappingURL=localities.entity.js.map