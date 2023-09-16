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
exports.CreateSaleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sale_status_enum_1 = require("../enum/sale-status.enum");
const pay_types_enum_1 = require("../enum/pay-types.enum");
const create_bills_fff_dto_1 = require("../../bills_fff/dto/create-bills_fff.dto");
class CreateSaleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 9,
        description: 'Id del evento al que pertenece',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateSaleDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 11,
        description: 'Id del promotor',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateSaleDto.prototype, "promoter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 11,
        description: 'Id del usuario de compro la localidad',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateSaleDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: pay_types_enum_1.PayTypes.DEBIT_CARD,
        description: 'Nombre de la localidad',
        enum: sale_status_enum_1.SaleStatus,
    }),
    (0, class_validator_1.IsEnum)(pay_types_enum_1.PayTypes),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "payType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: sale_status_enum_1.SaleStatus.SOLD,
        description: 'Nombre de la localidad',
        enum: sale_status_enum_1.SaleStatus,
    }),
    (0, class_validator_1.IsEnum)(sale_status_enum_1.SaleStatus),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '4671628756348179027894321',
        description: 'Numero de autorización del pago',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "authorizationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '4671628756348179027894321',
        description: 'Numero de transacción',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "transactionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'http://',
        description: 'Foto de la transferencia',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "transfer_photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'Valor del servicio',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "serviceValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'Descuento del promotor',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "promoterDiscount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 30,
        description: 'Valor de comisión de la pasarela',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "catwalkCommission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 40,
        description: 'Valor total cobrado',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [
            {
                quantity: 2,
                locality: 5,
            },
        ],
        description: 'Valor total cobrado',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSaleDto.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: 'John Doe',
            identification: '123456789',
            address: '123 Main St, City',
            phone: '555-555-5555',
            email: 'adbkaus@gmail.com',
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", create_bills_fff_dto_1.CreateBillsFffDto)
], CreateSaleDto.prototype, "bill", void 0);
exports.CreateSaleDto = CreateSaleDto;
//# sourceMappingURL=create-sale.dto.js.map