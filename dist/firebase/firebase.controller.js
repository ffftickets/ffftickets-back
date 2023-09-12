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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FirebaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let FirebaseController = FirebaseController_1 = class FirebaseController {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.logger = new common_1.Logger(FirebaseController_1.name);
    }
    async uploadBase64(body, res) {
        const data = await this.firebaseService.uploadBase64(body);
        return data;
    }
    async deleteImg(body, res) {
        await this.firebaseService.deleteImageByUrl(body.image);
        return res.status(common_1.HttpStatus.OK).json('Imagen eliminada correctamente.');
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UploadBase64ImageDto, Object]),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "uploadBase64", null);
__decorate([
    (0, common_1.Delete)('img'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteImg, Object]),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "deleteImg", null);
FirebaseController = FirebaseController_1 = __decorate([
    (0, swagger_1.ApiTags)('Firebase'),
    (0, common_1.Controller)('firebase'),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseController);
exports.FirebaseController = FirebaseController;
//# sourceMappingURL=firebase.controller.js.map