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
var EventTypeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeController = void 0;
const common_1 = require("@nestjs/common");
const event_type_service_1 = require("./event-type.service");
const swagger_1 = require("@nestjs/swagger");
const update_event_type_dto_1 = require("./dto/update-event-type.dto");
const decorators_1 = require("../common/helpers/decorators");
const app_roles_1 = require("../app.roles");
let EventTypeController = EventTypeController_1 = class EventTypeController {
    constructor(eventTypeService) {
        this.eventTypeService = eventTypeService;
        this.logger = new common_1.Logger(EventTypeController_1.name);
    }
    async create(res) {
        this.logger.log('Creando seed de tipos de evento');
        const eventsType = [
            { name: 'Publico', isActive: true },
            { name: 'Privado', isActive: true },
        ];
        const data = await this.eventTypeService.createSeed(eventsType);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res) {
        this.logger.log('Buscando todos los tipos eventos');
        const data = await this.eventTypeService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(id, updateEventTypeDto, res) {
        this.logger.log('Actualizando tipo de evento: ', updateEventTypeDto.name);
        const data = this.eventTypeService.update(+id, updateEventTypeDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    delete(id, res) {
        this.logger.log('Eliminado tipo de evento: ', id);
        const data = this.eventTypeService.delete(+id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
__decorate([
    (0, common_1.Post)('/seed-event-type'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'update',
        resource: app_roles_1.AppResource.EVENT_TYPE,
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_type_dto_1.UpdateEventTypeDto, Object]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Auth)({
        possession: 'any',
        action: 'delete',
        resource: app_roles_1.AppResource.EVENT_TYPE,
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventTypeController.prototype, "delete", null);
EventTypeController = EventTypeController_1 = __decorate([
    (0, swagger_1.ApiTags)('Event Type'),
    (0, common_1.Controller)('event-type'),
    __metadata("design:paramtypes", [event_type_service_1.EventTypeService])
], EventTypeController);
exports.EventTypeController = EventTypeController;
//# sourceMappingURL=event-type.controller.js.map