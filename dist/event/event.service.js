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
var EventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./entities/event.entity");
const typeorm_2 = require("typeorm");
const event_type_service_1 = require("../event-type/event-type.service");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const firebase_service_1 = require("../firebase/firebase.service");
const encryption_service_1 = require("../encryption/encryption.service");
let EventService = EventService_1 = class EventService {
    constructor(eventRepository, eventTypeService, firebaseService, encryptionService) {
        this.eventRepository = eventRepository;
        this.eventTypeService = eventTypeService;
        this.firebaseService = firebaseService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(EventService_1.name);
    }
    async create(createEventDto) {
        try {
            const eventType = await this.eventTypeService.findOne(createEventDto.event_type);
            createEventDto.event_type = eventType;
            const event = await this.eventRepository.create(createEventDto);
            delete event.user.password;
            delete event.user.roles;
            return await this.eventRepository.save(event);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [events, totalCount] = await this.eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
                .select(['event', 'user.id', 'user.name'])
                .where('event.isActive = :isActive', { isActive: true })
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encontraron eventos');
            }
            const decryptedEvents = events.map((event) => {
                event.user.name = this.encryptionService.decryptData(event.user.name);
                return event;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                events: decryptedEvents,
                currentPage: page,
                pageSize: limit,
                totalPages,
                totalCount,
            };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAllForAdmin(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [events, totalCount] = await this.eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
                .leftJoinAndSelect('event.event_type', 'event-type', 'event.eventTypeId = event-type.id')
                .leftJoinAndSelect('event.sale', 'sales', 'event.id = sales.eventId')
                .select(['event', 'user.id', 'user.name', 'event-type.name', 'sales'])
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encontraron eventos');
            }
            const eventsWithCount = events.map((event) => {
                const sales = event.sale;
                const soldCount = sales.filter((sale) => sale.status === 'SOLD').length;
                const incompleteCount = sales.filter((sale) => sale.status === 'INCOMPLETE').length;
                delete event.sale;
                return Object.assign(Object.assign({}, event), { soldCount,
                    incompleteCount });
            });
            const decryptedEvents = eventsWithCount.map((event) => {
                event.user.name = this.encryptionService.decryptData(event.user.name);
                return event;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                events: decryptedEvents,
                currentPage: page,
                pageSize: limit,
                totalPages,
                totalCount,
            };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOne(id) {
        try {
            const event = await this.eventRepository
                .createQueryBuilder('event')
                .innerJoin('event.user', 'user')
                .leftJoinAndSelect('event.event_type', 'event-type', 'event.eventTypeId = event-type.id')
                .where('event.id = :id', { id })
                .select([
                'event',
                'user.id',
                'user.name',
                'event-type.id',
                'event-type.name',
            ])
                .getOne();
            if (!event)
                throw new common_1.NotFoundException('No se encontró el evento');
            event.user.name = this.encryptionService.decryptData(event.user.name);
            return event;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findEventsByUser(id, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [events, totalCount] = await this.eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.user', 'user', 'event.userId = user.id')
                .leftJoinAndSelect('event.event_type', 'event-type', 'event.eventTypeId = event-type.id')
                .where('event.user = :id', { id })
                .select([
                'event',
                'user.id',
                'user.name',
                'event-type.id',
                'event-type.name',
            ])
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encontraron eventos');
            }
            const decryptedEvents = events.map((event) => {
                event.user.name = this.encryptionService.decryptData(event.user.name);
                return event;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                events: decryptedEvents,
                currentPage: page,
                pageSize: limit,
                totalPages,
                totalCount,
            };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async update(id, updateEventDto) {
        try {
            console.log(updateEventDto);
            await this.eventRepository.update(id, Object.assign({}, updateEventDto));
            return await this.findOne(id);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async remove(id) {
        try {
            await this.eventRepository.update(id, { isActive: false });
            return await this.findOne(id);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async deleteImgEvent(id, url) {
        try {
            const event = await this.findOne(id);
            console.log(1);
            if (event.poster === url) {
                event.poster = null;
            }
            if (event.courtesy_ticket === url) {
                event.courtesy_ticket = null;
            }
            if (event.event_gallery) {
                event.event_gallery = event.event_gallery.filter((element) => element !== url);
            }
            if (event.informative_gallery) {
                event.informative_gallery = event.informative_gallery.filter((element) => element !== url);
            }
            await this.firebaseService.deleteImageByUrl(url);
            return this.eventRepository.save(event);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async countEventsForUser(userId) {
        const eventCount = await this.eventRepository.count({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        return eventCount || 0;
    }
};
EventService = EventService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_type_service_1.EventTypeService,
        firebase_service_1.FirebaseService,
        encryption_service_1.EncryptionService])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map