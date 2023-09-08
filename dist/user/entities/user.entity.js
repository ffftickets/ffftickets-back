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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
const enums_1 = require("../../core/enums");
const license_entity_1 = require("../../license/entities/license.entity");
const event_entity_1 = require("../../event/entities/event.entity");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const event_promoter_entity_1 = require("../../event-promoter/entities/event-promoter.entity");
const identification_type_enum_1 = require("../emun/identification-type.enum");
const free_ticket_entity_1 = require("../../free-tickets/entities/free-ticket.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    updateTimeCreated() {
        const currentTimestamp = new Date().toLocaleString('en-US', {
            timeZone: 'America/Guayaquil',
        });
        this.createdAt = new Date(currentTimestamp);
    }
    updateTimestamp() {
        const currentTimestamp = new Date().toLocaleString('en-US', {
            timeZone: 'America/Guayaquil',
        });
        this.updatedAt = new Date(currentTimestamp);
    }
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await (0, bcryptjs_1.hash)(this.password, 10);
    }
    convertEmailToLowerCase() {
        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }
    async ValidateEmail() {
        const emailExist = await User_1.findOne({
            where: { email: this.email },
        });
        if (emailExist) {
            throw new common_1.ConflictException('El correo ya se encuentra registrado');
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "identification", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: identification_type_enum_1.IdentificationType,
        default: identification_type_enum_1.IdentificationType.CEDULA,
    }),
    __metadata("design:type", String)
], User.prototype, "identificationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Gender, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => license_entity_1.License, (license) => license.user),
    __metadata("design:type", license_entity_1.License)
], User.prototype, "licenseUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => event_entity_1.Event, (event) => event.user),
    __metadata("design:type", event_entity_1.Event)
], User.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => license_entity_1.License, (license) => license.userAdmin),
    __metadata("design:type", license_entity_1.License)
], User.prototype, "licenseAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => sale_entity_1.Sale, (sale) => sale.promoter),
    __metadata("design:type", sale_entity_1.Sale)
], User.prototype, "salePromoter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => sale_entity_1.Sale, (sale) => sale.customer),
    __metadata("design:type", sale_entity_1.Sale)
], User.prototype, "saleCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.UserStatus, default: enums_1.UserStatus.ACTIVE }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "terms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => event_promoter_entity_1.EventPromoter, (eventPromoter) => eventPromoter.promoter),
    __metadata("design:type", event_promoter_entity_1.EventPromoter)
], User.prototype, "eventPromoter", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'last_login', type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => free_ticket_entity_1.FreeTicket, (free) => free.user),
    __metadata("design:type", free_ticket_entity_1.FreeTicket)
], User.prototype, "free_ticket", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateTimeCreated", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateTimestamp", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "convertEmailToLowerCase", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "ValidateEmail", null);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map