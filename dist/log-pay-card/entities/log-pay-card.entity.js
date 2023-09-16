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
exports.CreateLogPayCardSchema = exports.CreateLogPayCard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_tz_1 = require("date-fns-tz");
const mongoose_2 = require("mongoose");
let CreateLogPayCard = class CreateLogPayCard extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "id_transaccion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CreateLogPayCard.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "cardType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "cardIssuer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "cardInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "clientID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "clientName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "fecha", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "acquirer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CreateLogPayCard.prototype, "deferred", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "interests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CreateLogPayCard.prototype, "interestValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "amountWoTaxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "amountWTaxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "taxesValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CreateLogPayCard.prototype, "amountAuthorized", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "authorizationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "tipoPago", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], CreateLogPayCard.prototype, "ipDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], CreateLogPayCard.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CreateLogPayCard.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], CreateLogPayCard.prototype, "sale", void 0);
CreateLogPayCard = __decorate([
    (0, mongoose_1.Schema)({ collection: 'log_pay_cards' })
], CreateLogPayCard);
exports.CreateLogPayCard = CreateLogPayCard;
exports.CreateLogPayCardSchema = mongoose_1.SchemaFactory.createForClass(CreateLogPayCard);
exports.CreateLogPayCardSchema.pre('save', async function (next) {
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
    const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss';
    this.createdAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    this.updatedAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    next();
});
//# sourceMappingURL=log-pay-card.entity.js.map