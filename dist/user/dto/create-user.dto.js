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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_roles_1 = require("../../app.roles");
const enumToString_1 = require("../../common/helpers/emuns/enumToString");
const enums_1 = require("../../core/enums");
const user_status_emun_1 = require("../../core/enums/user-status.emun");
const identification_type_enum_1 = require("../emun/identification-type.enum");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user123@gmail.com',
        description: 'Email del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678',
        description: 'Contraseña del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Oscar Parraga',
        description: 'Nombre del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0974631312',
        description: 'Teléfono del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3716271821001',
        description: 'Identificación del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "identification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Tungurahua',
        description: 'Provincia del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Ambato',
        description: 'Ciudad del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Ambato',
        description: 'Dirección del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'http://',
        description: 'Foto del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [],
        description: 'Roles del usuario',
        enum: app_roles_1.AppRoles,
        example: app_roles_1.AppRoles.CUSTOMER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(app_roles_1.AppRoles, {
        each: true,
        message: `must be a valid role value, ${(0, enumToString_1.EnumToString)(app_roles_1.AppRoles)}`,
    }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: identification_type_enum_1.IdentificationType.CEDULA,
        description: 'Tipo de identificac ión',
        enum: identification_type_enum_1.IdentificationType,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(identification_type_enum_1.IdentificationType),
    __metadata("design:type", String)
], CreateUserDto.prototype, "identificationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: user_status_emun_1.UserStatus.ACTIVE,
        description: 'Estado del usuario',
        enum: user_status_emun_1.UserStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(user_status_emun_1.UserStatus),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Estado actividad del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Aceptación de términos y condiciones',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-05-28T02:31:07.313Z',
        description: 'Fecha del cumpleaños del usuario',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthdate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.Gender.MASCULINO,
        description: 'Genero del usuario',
        enum: enums_1.Gender,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map