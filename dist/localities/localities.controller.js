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
var LocalitiesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalitiesController = void 0;
const common_1 = require("@nestjs/common");
const localities_service_1 = require("./localities.service");
const create_locality_dto_1 = require("./dto/create-locality.dto");
const update_locality_dto_1 = require("./dto/update-locality.dto");
const swagger_1 = require("@nestjs/swagger");
const firebase_service_1 = require("../firebase/firebase.service");
const event_service_1 = require("../event/event.service");
let LocalitiesController = LocalitiesController_1 = class LocalitiesController {
    constructor(localitiesService, firebaseService, eventService) {
        this.localitiesService = localitiesService;
        this.firebaseService = firebaseService;
        this.eventService = eventService;
        this.logger = new common_1.Logger(LocalitiesController_1.name);
    }
    async create(createLocalityDto, res) {
        this.logger.log(`Creando localidad: `, createLocalityDto.name);
        const event = await this.eventService.findOne(createLocalityDto.event);
        createLocalityDto.event = event;
        await this.localitiesService.verifyExist(event.id, createLocalityDto.name);
        if (createLocalityDto.photo !== undefined) {
            const uploadImg = {
                image: createLocalityDto.photo,
                route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${createLocalityDto.name}`,
            };
            createLocalityDto.photo = (await this.firebaseService.uploadBase64(uploadImg)).imageUrl;
        }
        const data = await this.localitiesService.create(createLocalityDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res) {
        this.logger.log('Buscando todas las localidades');
        const data = await this.localitiesService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        this.logger.log(`Buscando localidad: ${id}`);
        const data = await this.localitiesService.findOne(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async getLocalitiesByEvent(event, res) {
        this.logger.log(`Buscando localidad por evento: ${event}`);
        const data = await this.localitiesService.getLocalitiesByEvent(+event);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(id, updateLocalityDto, res) {
        this.logger.log(`Actualizando localidad: ${id}`);
        const locality = await this.localitiesService.findOne(+id);
        const event = await this.eventService.findOne(+locality.event.id);
        console.log(updateLocalityDto.photo);
        if (updateLocalityDto.photo) {
            const uploadImg = {
                image: updateLocalityDto.photo,
                route: `${event.user.id} - ${event.user.name}/${event.name}/localities/${locality.name}`,
            };
            updateLocalityDto.photo = (await this.firebaseService.uploadBase64(uploadImg)).imageUrl;
        }
        if (locality.photo)
            await this.firebaseService.deleteImageByUrl(locality.photo);
        const data = await this.localitiesService.update(+id, updateLocalityDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(id, res) {
        this.logger.log(`Eliminando localidad: ${id}`);
        const data = await this.localitiesService.remove(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_locality_dto_1.CreateLocalityDto, Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('event/:event'),
    __param(0, (0, common_1.Param)('event')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "getLocalitiesByEvent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_locality_dto_1.UpdateLocalityDto, Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocalitiesController.prototype, "remove", null);
LocalitiesController = LocalitiesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Localities'),
    (0, common_1.Controller)('localities'),
    __metadata("design:paramtypes", [localities_service_1.LocalitiesService,
        firebase_service_1.FirebaseService,
        event_service_1.EventService])
], LocalitiesController);
exports.LocalitiesController = LocalitiesController;
//# sourceMappingURL=localities.controller.js.map