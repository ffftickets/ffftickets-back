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
exports.UpdateSaleCard = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const log_pay_card_entity_1 = require("../../log-pay-card/entities/log-pay-card.entity");
class UpdateSaleCard {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '4671628756348179027894321',
        description: 'Numero de autorización del pago',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSaleCard.prototype, "authorizationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '4671628756348179027894321',
        description: 'Numero de transacción',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSaleCard.prototype, "transactionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 30,
        description: 'Valor de comisión de la pasarela',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSaleCard.prototype, "catwalkCommission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            "id_transaccion": "10220e91-0758-4457-9d1f-7322c24275a9",
            "token": "707504-230907-049553",
            "amount": 30,
            "cardType": "credit",
            "cardIssuer": "DISCOVER",
            "cardInfo": "6011 76XX XXXX 0843",
            "clientID": "2300687510",
            "clientName": "JONH DOE",
            "state": "PAGADO",
            "fecha": "2023-09-07 16:52:10",
            "acquirer": "DINERS",
            "deferred": 0,
            "interests": "NO",
            "interestValue": 0,
            "amountWoTaxes": "10.00",
            "amountWTaxes": "17.86",
            "taxesValue": "2.14",
            "amountAuthorized": 30,
            "authorizationNumber": "4671628756348179027894321",
            "tipoPago": "TARJETA"
        },
        description: 'Información de la transacción',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", log_pay_card_entity_1.CreateLogPayCard)
], UpdateSaleCard.prototype, "log", void 0);
exports.UpdateSaleCard = UpdateSaleCard;
//# sourceMappingURL=update-sale-card.js.map