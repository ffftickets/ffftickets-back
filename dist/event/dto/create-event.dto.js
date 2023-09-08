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
exports.CreateEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_event_enum_1 = require("../emun/status-event.enum");
const payment_method_enum_1 = require("../emun/payment-method.enum");
class CreateEventDto {
    constructor() {
        this.payment_methods = [
            payment_method_enum_1.PaymentMethod.TRANSFER,
            payment_method_enum_1.PaymentMethod.CARD,
            payment_method_enum_1.PaymentMethod.PAYPHONE,
        ];
        this.iva = true;
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Id del usuario creador del evento',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NH Fest Hallowen',
        description: 'Nombre del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-06-29 05:13:55',
        description: 'Fecha del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "event_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12:00',
        description: 'Hora del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ambato',
        description: 'Ciudad del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Tungurahua',
        description: 'Provincia del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '9 de octubre',
        description: 'Dirección del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '-12.12,13.2',
        description: 'Geo location del evento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "geo_location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http:url',
        description: 'Url del poster ',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "poster", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http:url',
        description: 'Url de la imagen del ticket ',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "courtesy_ticket", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [],
        description: 'Galería informativa del evento',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "informative_gallery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [], description: 'Galeria del evento' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "event_gallery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2300687510',
        description: 'Ruc del organizador del evento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "ruc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '41214124122',
        description: 'Autorización municipal',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "municipal_authorization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '563231523332',
        description: 'Autorización de emisión',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "issuance_authorization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '31234124312',
        description: 'Autorización de aforo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "capacity_authorization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'ACTIVE',
        description: 'Estado del evento',
        enum: status_event_enum_1.EventStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(status_event_enum_1.EventStatus),
    __metadata("design:type", String)
], CreateEventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Estado del evento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEventDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Id tipo de evento',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "event_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [],
        description: 'Eventos pasados',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "past_events", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Valor de sumisión',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        enum: payment_method_enum_1.PaymentMethod,
        default: [
            payment_method_enum_1.PaymentMethod.TRANSFER,
            payment_method_enum_1.PaymentMethod.CARD,
            payment_method_enum_1.PaymentMethod.PAYPHONE,
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(payment_method_enum_1.PaymentMethod, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "payment_methods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Iva del evento',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateEventDto.prototype, "iva", void 0);
exports.CreateEventDto = CreateEventDto;
//# sourceMappingURL=create-event.dto.js.map