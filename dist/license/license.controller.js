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
var LicenseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseController = void 0;
const common_1 = require("@nestjs/common");
const license_service_1 = require("./license.service");
const create_license_dto_1 = require("./dto/create-license.dto");
const update_license_dto_1 = require("./dto/update-license.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/helpers/decorators");
const app_roles_1 = require("../app.roles");
const user_entity_1 = require("../user/entities/user.entity");
let LicenseController = LicenseController_1 = class LicenseController {
    constructor(licenseService) {
        this.licenseService = licenseService;
        this.logger = new common_1.Logger(LicenseController_1.name);
    }
    async create(createLicenseDto, user, res) {
        createLicenseDto.userAdmin = user.id;
        this.logger.log('Creando licencia');
        const data = await this.licenseService.create(createLicenseDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res) {
        this.logger.log('Obteniendo todas las licencias');
        const data = await this.licenseService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        this.logger.log('Buscando licencia con id: ', id);
        const data = await this.licenseService.findOne(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    update(id, updateLicenseDto, res) {
        this.logger.log('Actualizando licencia: ', id);
        const data = this.licenseService.update(+id, updateLicenseDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    remove(id, res) {
        this.logger.log('Eliminando licencia: ', id);
        const data = this.licenseService.remove(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'create',
        resource: app_roles_1.AppResource.LICENSE,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_license_dto_1.CreateLicenseDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "create", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'read',
        resource: app_roles_1.AppResource.LICENSE,
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'read',
        resource: app_roles_1.AppResource.LICENSE,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'update',
        resource: app_roles_1.AppResource.LICENSE,
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_license_dto_1.UpdateLicenseDto, Object]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "update", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'delete',
        resource: app_roles_1.AppResource.LICENSE,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "remove", null);
LicenseController = LicenseController_1 = __decorate([
    (0, swagger_1.ApiTags)('License'),
    (0, common_1.Controller)('license'),
    __metadata("design:paramtypes", [license_service_1.LicenseService])
], LicenseController);
exports.LicenseController = LicenseController;
//# sourceMappingURL=license.controller.js.map