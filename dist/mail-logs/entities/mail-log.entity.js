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
exports.MailLogSchema = exports.MailLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_tz_1 = require("date-fns-tz");
const mongoose_2 = require("mongoose");
let MailLog = class MailLog extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MailLog.prototype, "receiver", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MailLog.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MailLog.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], MailLog.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], MailLog.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], MailLog.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], MailLog.prototype, "updatedAt", void 0);
MailLog = __decorate([
    (0, mongoose_1.Schema)({ collection: 'log_mail' })
], MailLog);
exports.MailLog = MailLog;
exports.MailLogSchema = mongoose_1.SchemaFactory.createForClass(MailLog);
exports.MailLogSchema.pre('save', async function (next) {
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
    const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss';
    this.createdAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    this.updatedAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    next();
    next();
});
//# sourceMappingURL=mail-log.entity.js.map