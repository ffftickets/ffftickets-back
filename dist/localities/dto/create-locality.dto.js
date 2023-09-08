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
exports.CreateLocalityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const localite_status_enum_1 = require("../enum/localite-status.enum");
class CreateLocalityDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'Id del evento al que pertenece',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLocalityDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'VIP',
        description: 'Nombre de la localidad',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLocalityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Precio de la localidad',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateLocalityDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'Capacidad de la localidad',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateLocalityDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 90,
        description: 'Numero de entradas vendidas',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLocalityDto.prototype, "sold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'imgBase64 / URL',
        description: 'Imagen de la localidad',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLocalityDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: localite_status_enum_1.LocaliteStatus.ACTIVE,
        description: 'Estado de la localidad',
        enum: localite_status_enum_1.LocaliteStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(localite_status_enum_1.LocaliteStatus),
    __metadata("design:type", String)
], CreateLocalityDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 12.3,
        description: 'Valor del iva',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocalityDto.prototype, "iva", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 20,
        description: 'Total',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocalityDto.prototype, "total", void 0);
exports.CreateLocalityDto = CreateLocalityDto;
//# sourceMappingURL=create-locality.dto.js.map