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
var LocalitiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalitiesService = void 0;
const common_1 = require("@nestjs/common");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const typeorm_1 = require("@nestjs/typeorm");
const localities_entity_1 = require("./entities/localities.entity");
const typeorm_2 = require("typeorm");
const event_service_1 = require("../event/event.service");
const firebase_service_1 = require("../firebase/firebase.service");
let LocalitiesService = LocalitiesService_1 = class LocalitiesService {
    constructor(localitiesRepository, eventService, firebaseService) {
        this.localitiesRepository = localitiesRepository;
        this.eventService = eventService;
        this.firebaseService = firebaseService;
        this.logger = new common_1.Logger(LocalitiesService_1.name);
    }
    async create(createLocalityDto) {
        try {
            const data = await this.localitiesRepository.create(createLocalityDto);
            const locality = await this.localitiesRepository.save(data);
            return locality;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll() {
        try {
            const localities = await this.localitiesRepository
                .createQueryBuilder('locality')
                .innerJoin('locality.event', 'event')
                .select(['locality', 'event'])
                .getMany();
            if (!localities || localities.length === 0)
                throw new common_1.NotFoundException('No se encontraron localidades');
            return localities;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOne(id) {
        try {
            const locality = await this.localitiesRepository
                .createQueryBuilder('locality')
                .innerJoin('locality.event', 'event')
                .select(['locality', 'event'])
                .where('locality.id=:id', { id })
                .getOne();
            if (!locality)
                throw new common_1.NotFoundException('No se encontró la localidad');
            return locality;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async getLocalitiesByEvent(id) {
        try {
            const localities = await this.localitiesRepository
                .createQueryBuilder('locality')
                .innerJoin('locality.event', 'event')
                .select(['locality'])
                .where('locality.event=:id', { id })
                .getMany();
            if (!localities || localities.length === 0)
                throw new common_1.NotFoundException('No se encontraron localidades');
            return localities;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async update(id, updateLocalityDto) {
        try {
            await this.localitiesRepository.update(id, Object.assign({}, updateLocalityDto));
            const data = await this.findOne(id);
            return data;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async updateSold(id, sold) {
        try {
            console.log(id, sold);
            this.logger.log('Actualizando venta: ' + id);
            await this.localitiesRepository.update(id, {
                sold: sold,
            });
            return null;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async remove(id) {
        try {
            await this.localitiesRepository.update(id, { isActive: false });
            const data = await this.findOne(id);
            return data;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async verifyExist(id, name) {
        try {
            const locality = await this.localitiesRepository
                .createQueryBuilder('locality')
                .innerJoin('locality.event', 'event')
                .select(['locality', 'event'])
                .where('locality.name=:name', { name })
                .andWhere('event.id=:id', { id })
                .getOne();
            console.log(locality);
            if (locality)
                throw new common_1.ConflictException('El nombre de la localidad ya existe');
            return null;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
LocalitiesService = LocalitiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(localities_entity_1.Localities)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_service_1.EventService,
        firebase_service_1.FirebaseService])
], LocalitiesService);
exports.LocalitiesService = LocalitiesService;
//# sourceMappingURL=localities.service.js.map