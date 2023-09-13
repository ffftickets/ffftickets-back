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
exports.CreateEventPromoterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_event_enum_1 = require("../emun/status-event.enum");
class CreateEventPromoterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Id del event',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateEventPromoterDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Id del promotor',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateEventPromoterDto.prototype, "promoter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'HUMILDE',
        description: 'Código de descuento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateEventPromoterDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado del evento',
        enum: status_event_enum_1.EventPromoterStatus,
        example: status_event_enum_1.EventPromoterStatus.ACTIVE,
    }),
    (0, class_validator_1.IsEnum)(status_event_enum_1.EventPromoterStatus),
    __metadata("design:type", String)
], CreateEventPromoterDto.prototype, "status", void 0);
exports.CreateEventPromoterDto = CreateEventPromoterDto;
//# sourceMappingURL=create-event-promoter.dto.js.map