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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const event_type_entity_1 = require("../../event-type/entities/event-type.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const status_event_enum_1 = require("../emun/status-event.enum");
const localities_entity_1 = require("../../localities/entities/localities.entity");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const event_promoter_entity_1 = require("../../event-promoter/entities/event-promoter.entity");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entity_1.User, (user) => user.event),
    __metadata("design:type", user_entity_1.User)
], Event.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => localities_entity_1.Localities, (location) => location.event),
    __metadata("design:type", localities_entity_1.Localities)
], Event.prototype, "localities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '', nullable: false }),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Event.prototype, "event_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: false }),
    __metadata("design:type", String)
], Event.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Event.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Event.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Event.prototype, "geo_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "poster", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "event_gallery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "informative_gallery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "courtesy_ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "ruc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "municipal_authorization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "issuance_authorization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: 'Dirección' }),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "capacity_authorization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: status_event_enum_1.EventStatus, default: status_event_enum_1.EventStatus.ACTIVE }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => event_type_entity_1.EventType, (eventType) => eventType.event),
    __metadata("design:type", event_type_entity_1.EventType)
], Event.prototype, "event_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "past_events", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => sale_entity_1.Sale, (sale) => sale.event),
    __metadata("design:type", sale_entity_1.Sale)
], Event.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => event_promoter_entity_1.EventPromoter, (eventPromoter) => eventPromoter.event),
    __metadata("design:type", event_promoter_entity_1.EventPromoter)
], Event.prototype, "promoter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 1 }),
    __metadata("design:type", Number)
], Event.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Event.prototype, "payment_methods", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Event.prototype, "iva", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)('event')
], Event);
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map