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
var EventTypeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_type_entity_1 = require("./entities/event-type.entity");
const typeorm_2 = require("typeorm");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let EventTypeService = EventTypeService_1 = class EventTypeService {
    constructor(eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
        this.logger = new common_1.Logger(EventTypeService_1.name);
    }
    async createSeed(createEventTypeDto) {
        try {
            const seed = this.eventTypeRepository.create(createEventTypeDto);
            return await this.eventTypeRepository.save(createEventTypeDto);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll() {
        try {
            const events = await this.eventTypeRepository.find();
            if (!events)
                throw new common_1.NotFoundException('No se encontraron tipos de eventos');
            return events;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOne(id) {
        try {
            const eventType = await this.eventTypeRepository.findOne({ where: { id } });
            if (!eventType)
                throw new common_1.NotFoundException('No se encontró el tipo de evento');
            return eventType;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async update(id, updateEventTypeDto) {
        try {
            await this.eventTypeRepository.update(id, Object.assign({}, updateEventTypeDto));
            return await this.findOne(id);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async delete(id) {
        try {
            await this.eventTypeRepository.update(id, {
                isActive: false,
            });
            return await this.findOne(id);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
EventTypeService = EventTypeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_type_entity_1.EventType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventTypeService);
exports.EventTypeService = EventTypeService;
//# sourceMappingURL=event-type.service.js.map