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
exports.CreateBillsFffDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBillsFffDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Nombre del cliente',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBillsFffDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456789',
        description: 'Número de identificación del cliente',
    }),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateBillsFffDto.prototype, "identification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Main St, City',
        description: 'Dirección del cliente',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBillsFffDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '555-555-5555',
        description: 'Número de teléfono del cliente',
    }),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateBillsFffDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'johndoe@example.com',
        description: 'Correo electrónico del cliente',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateBillsFffDto.prototype, "email", void 0);
exports.CreateBillsFffDto = CreateBillsFffDto;
//# sourceMappingURL=create-bills_fff.dto.js.map