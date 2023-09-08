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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../app.roles");
const decorators_1 = require("../common/helpers/decorators");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async AdminRegistration(createUserDto, res) {
        this.logger.log('Registrando usuario como administrador');
        const data = await this.userService.create(createUserDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async PublicRegistration(createUserDto, res) {
        this.logger.log('Registrando persona publica');
        this.logger.log('Correo: ', createUserDto.email);
        createUserDto.roles = [app_roles_1.AppRoles.CUSTOMER];
        if (!createUserDto.password) {
            createUserDto.password = createUserDto.identification;
        }
        const data = await this.userService.create(createUserDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async UnblockUser(id, res) {
        this.logger.log('Desbloqueando usuario', id);
        const data = await this.userService.unblockUser(id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async UserSeed(res) {
        this.logger.log('Creando seed de usuario');
        const data = await this.userService.createSeedUser();
        return res.status(common_1.HttpStatus.OK).json('Usuarios creados');
    }
    async findAll(res, page = 1, limit = 10, role) {
        this.logger.log('Buscando todos los usuarios');
        const users = await this.userService.findAll(page, limit, role);
        return res.status(common_1.HttpStatus.OK).json(users);
    }
    async findOne(id, res) {
        this.logger.log('Buscando usuario por ID: ', id);
        const data = await this.userService.findOne({ id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(id, updateUserDto, res) {
        this.logger.log('Actualizando usuario: ', updateUserDto.email);
        const data = await this.userService.update(+id, updateUserDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(id, res) {
        this.logger.log('Desactivando usuario: ', id);
        const data = await this.userService.remove(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'create',
        resource: app_roles_1.AppResource.USER,
    }),
    (0, common_1.Post)('admin-register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "AdminRegistration", null);
__decorate([
    (0, common_1.Post)('public-register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "PublicRegistration", null);
__decorate([
    (0, common_1.Patch)(':id/unblock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UnblockUser", null);
__decorate([
    (0, common_1.Get)('/userSeed'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UserSeed", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'read',
        resource: app_roles_1.AppResource.USER,
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'read',
        resource: app_roles_1.AppResource.USER,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Auth)({
        possession: 'own',
        action: 'update',
        resource: app_roles_1.AppResource.USER,
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'delete',
        resource: app_roles_1.AppResource.USER,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map