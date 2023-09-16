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
exports.LoginLogSchema = exports.LoginLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_tz_1 = require("date-fns-tz");
const mongoose_2 = require("mongoose");
let LoginLog = class LoginLog extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoginLog.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoginLog.prototype, "blockStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], LoginLog.prototype, "ipDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], LoginLog.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], LoginLog.prototype, "isCorrect", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LoginLog.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LoginLog.prototype, "updatedAt", void 0);
LoginLog = __decorate([
    (0, mongoose_1.Schema)({ collection: 'log_login' })
], LoginLog);
exports.LoginLog = LoginLog;
exports.LoginLogSchema = mongoose_1.SchemaFactory.createForClass(LoginLog);
exports.LoginLogSchema.pre('save', async function (next) {
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
    const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss';
    this.createdAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    this.updatedAt = (0, date_fns_tz_1.format)(fechaActualEcuador, formatoFechaHora);
    next();
});
//# sourceMappingURL=login-log.entity.js.map