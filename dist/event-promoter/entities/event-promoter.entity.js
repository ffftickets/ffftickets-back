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
exports.EventPromoter = void 0;
const event_entity_1 = require("../../event/entities/event.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const status_event_enum_1 = require("../emun/status-event.enum");
const date_fns_tz_1 = require("date-fns-tz");
let EventPromoter = class EventPromoter {
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
], EventPromoter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => event_entity_1.Event, (event) => event.promoter),
    __metadata("design:type", event_entity_1.Event)
], EventPromoter.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entity_1.User, (user) => user.eventPromoter),
    __metadata("design:type", user_entity_1.User)
], EventPromoter.prototype, "promoter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], EventPromoter.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], EventPromoter.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_event_enum_1.EventPromoterStatus,
        default: status_event_enum_1.EventPromoterStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], EventPromoter.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], EventPromoter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], EventPromoter.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventPromoter.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventPromoter.prototype, "setUpdatedAt", null);
EventPromoter = __decorate([
    (0, typeorm_1.Entity)('event-promoter')
], EventPromoter);
exports.EventPromoter = EventPromoter;
//# sourceMappingURL=event-promoter.entity.js.map