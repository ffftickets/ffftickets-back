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
exports.UploadPhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UploadPhotoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 9,
        description: 'Id del evento al que pertenece',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UploadPhotoDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 11,
        description: 'Foto del comprobante',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UploadPhotoDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 11,
        description: 'Total compra actualizado',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UploadPhotoDto.prototype, "total", void 0);
exports.UploadPhotoDto = UploadPhotoDto;
//# sourceMappingURL=uploadPhoto.dto.js.map