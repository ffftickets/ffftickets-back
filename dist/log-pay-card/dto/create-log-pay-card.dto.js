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
exports.CreateLogPayCardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateLogPayCardDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10220e91-0758-4457-9d1f-7322c24275a9',
        description: 'ID de la transacción',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "id_transaccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '707504-230907-049553',
        description: 'Token de la transacción',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'Monto de la transacción',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLogPayCardDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'credit',
        description: 'Tipo de tarjeta (credit/debit)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DISCOVER',
        description: 'Emisor de la tarjeta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "cardIssuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6011 76XX XXXX 0843',
        description: 'Información de la tarjeta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "cardInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2300687510',
        description: 'ID del cliente',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "clientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'JONH DOE',
        description: 'Nombre del cliente',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PAGADO',
        description: 'Estado de la transacción',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-09-07 16:52:10',
        description: 'Fecha de la transacción',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "fecha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DINERS',
        description: 'Adquirente de la tarjeta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "acquirer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Diferido',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLogPayCardDto.prototype, "deferred", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NO',
        description: 'Intereses',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "interests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Valor de intereses',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLogPayCardDto.prototype, "interestValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10.00',
        description: 'Monto sin impuestos',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "amountWoTaxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '17.86',
        description: 'Monto con impuestos',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "amountWTaxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2.14',
        description: 'Valor de impuestos',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "taxesValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'Monto autorizado',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLogPayCardDto.prototype, "amountAuthorized", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '4671628756348179027894321',
        description: 'Numero de autorización del pago',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "authorizationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TARJETA',
        description: 'Tipo de pago',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogPayCardDto.prototype, "tipoPago", void 0);
exports.CreateLogPayCardDto = CreateLogPayCardDto;
//# sourceMappingURL=create-log-pay-card.dto.js.map