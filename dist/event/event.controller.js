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
var EventController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/helpers/decorators");
const user_entity_1 = require("../user/entities/user.entity");
const amazon_s3_service_1 = require("../amazon-s3/amazon-s3.service");
let EventController = EventController_1 = class EventController {
    constructor(eventService, amazon3SService) {
        this.eventService = eventService;
        this.amazon3SService = amazon3SService;
        this.logger = new common_1.Logger(EventController_1.name);
    }
    async create(createEventDto, user, res) {
        this.logger.log(`Creando evento: `, createEventDto.name);
        createEventDto.user = user;
        const data = await this.eventService.create(createEventDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res, page = 1, limit = 40) {
        this.logger.log('Buscando todos los eventos');
        const data = await this.eventService.findAll(page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAllForAdmin(res, page = 1, limit = 10) {
        this.logger.log('Buscando todos los eventos para administración');
        const data = await this.eventService.findAllForAdmin(page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        this.logger.log(`Buscando evento: ${id} `);
        const data = await this.eventService.findOne(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findEventsByOrganizer(organizer, res, page = 1, limit = 10) {
        this.logger.log(`Buscando eventos del organizador para public: ${organizer} `);
        const data = await this.eventService.findEventsByUser(organizer, page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findEventsByUser(user, res, page = 1, limit = 10) {
        this.logger.log(`Buscando eventos del organizador para organizador: ${user.id} `);
        const data = await this.eventService.findEventsByUser(user.id, page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(id, updateEventDto, user, res) {
        this.logger.log(`Actualizando evento: `, id);
        const event = await this.eventService.findOne(+id);
        this.logger.log('Verificando tickets.');
        this.logger.log('Verificando pases de cortesía.');
        if (updateEventDto.courtesy_ticket) {
            let img = await this.amazon3SService.uploadBase64({
                route: `${user.id} - ${user.name}/${event.name}`,
                image: updateEventDto.courtesy_ticket,
            });
            if (event.courtesy_ticket)
                this.amazon3SService.deleteImageByUrl(event.courtesy_ticket);
            updateEventDto.courtesy_ticket = img.imageUrl;
        }
        this.logger.log('Verificando poster.');
        if (updateEventDto.poster) {
            let img = await this.amazon3SService.uploadBase64({
                route: `${user.id} - ${user.name}/${event.name}`,
                image: updateEventDto.poster,
            });
            if (event.poster)
                this.amazon3SService.deleteImageByUrl(event.poster);
            updateEventDto.poster = img.imageUrl;
        }
        this.logger.log('Verificando galería de eventos.');
        if (updateEventDto.event_gallery) {
            const updatedImages = [];
            for (const image of updateEventDto.event_gallery) {
                const img = await this.amazon3SService.uploadBase64({
                    route: `${user.id} - ${user.name}/${event.name}/event-gallery`,
                    image: image,
                });
                updatedImages.push(img.imageUrl);
            }
            if (event.event_gallery === null) {
                updateEventDto.event_gallery = [...updatedImages];
            }
            else {
                updateEventDto.event_gallery = [
                    ...updatedImages,
                    ...event.event_gallery,
                ];
            }
        }
        this.logger.log('Verificando galería informativa.');
        if (updateEventDto.informative_gallery) {
            const updatedImages = [];
            for (const image of updateEventDto.informative_gallery) {
                const img = await this.amazon3SService.uploadBase64({
                    route: `${user.id} - ${user.name}/${event.name}/informative-gallery`,
                    image: image,
                });
                updatedImages.push(img.imageUrl);
            }
            if (event.informative_gallery === null) {
                updateEventDto.informative_gallery = [...updatedImages];
            }
            else {
                updateEventDto.informative_gallery = [
                    ...updatedImages,
                    ...event.informative_gallery,
                ];
            }
        }
        const data = await this.eventService.update(+id, updateEventDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async deleteImgEvent(id, url, res) {
        this.logger.log(`Eliminando imagen: ${url}`);
        const data = await this.eventService.deleteImgEvent(+id, url);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(id, res) {
        this.logger.log(`Eliminando evento: ${id}`);
        const data = await this.eventService.remove(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('/find/administration'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('organizer/:organizer'),
    __param(0, (0, common_1.Param)('organizer')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findEventsByOrganizer", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('user/events'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findEventsByUser", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/img/:id/:url'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('url')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteImgEvent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "remove", null);
EventController = EventController_1 = __decorate([
    (0, swagger_1.ApiTags)('Event'),
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService,
        amazon_s3_service_1.AmazonS3Service])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map