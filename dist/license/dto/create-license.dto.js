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
exports.CreateLicenseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLicenseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-05-28T02:31:07.313Z',
        description: 'Fecha del inicio de la licencia',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-05-28T02:31:07.313Z',
        description: 'Fecha de finalización de la licencia',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'B. PICHINCHA',
        description: 'Institución bancaria del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "institution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'C. CORRIENTE',
        description: 'Tipo de cuenta del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4244323',
        description: 'Numero de cuenta del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'hhtp://url',
        description: 'URL del documento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLicenseDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Id del usuario a quien se le emite la licencia',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateLicenseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Estado actividad del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLicenseDto.prototype, "isActive", void 0);
exports.CreateLicenseDto = CreateLicenseDto;
//# sourceMappingURL=create-license.dto.js.map