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
var EventType_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../event/entities/event.entity");
const date_fns_tz_1 = require("date-fns-tz");
let EventType = EventType_1 = class EventType extends typeorm_1.BaseEntity {
    async eventTypeExist() {
        const eventTypeExist = await EventType_1.findOne({
            where: { name: this.name }
        });
        if (eventTypeExist) {
            throw new common_1.ConflictException('Ya existe el tipo de evento');
        }
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
], EventType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '', nullable: false }),
    __metadata("design:type", String)
], EventType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true, nullable: false }),
    __metadata("design:type", Boolean)
], EventType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => event_entity_1.Event, (event) => event.event_type),
    __metadata("design:type", event_entity_1.Event)
], EventType.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], EventType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], EventType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventType.prototype, "eventTypeExist", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventType.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventType.prototype, "setUpdatedAt", null);
EventType = EventType_1 = __decorate([
    (0, typeorm_1.Entity)('event-type')
], EventType);
exports.EventType = EventType;
//# sourceMappingURL=event-type.entity.js.map