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
var FreeTicketsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeTicketsService = void 0;
const common_1 = require("@nestjs/common");
const free_ticket_entity_1 = require("./entities/free-ticket.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const localities_service_1 = require("../localities/localities.service");
const user_service_1 = require("../user/user.service");
const uuid_1 = require("uuid");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const ticket_status_enum_1 = require("./enum/ticket-status.enum");
let FreeTicketsService = FreeTicketsService_1 = class FreeTicketsService {
    constructor(freeTicketRepository, localitiesService, userService) {
        this.freeTicketRepository = freeTicketRepository;
        this.localitiesService = localitiesService;
        this.userService = userService;
        this.logger = new common_1.Logger(FreeTicketsService_1.name);
    }
    async findByUser(user) {
        try {
            const tickets = await this.freeTicketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.user', 'user')
                .innerJoin('localities.event', 'event')
                .select(['ticket', 'localities', 'user', 'event.name', 'event.id'])
                .where('ticket.user=:user', { user })
                .getMany();
            if (tickets.length === 0)
                throw new common_1.NotFoundException('No se encontraron tickets del usuario');
            return tickets;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async create(createFreeTicketDto) {
        try {
            const locality = await this.localitiesService.findOne(createFreeTicketDto.locality);
            if (locality.sold >= locality.capacity)
                throw new common_1.BadRequestException('No se encuentran entradas disponibles');
            if (locality.price !== 0)
                throw new common_1.BadRequestException('La entrada no es gratuita');
            createFreeTicketDto.locality = locality;
            const data = await this.freeTicketRepository.create(Object.assign(Object.assign({}, createFreeTicketDto), { qr: (0, uuid_1.v4)() }));
            const newTicket = await this.freeTicketRepository.save(data);
            this.localitiesService.updateSold(locality.id, locality.sold + 1);
            return newTicket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll() {
        try {
            const tickets = await this.freeTicketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.user', 'user')
                .innerJoin('localities.event', 'event')
                .select(['ticket', 'localities', 'user', 'event'])
                .getMany();
            if (tickets.length === 0)
                throw new common_1.NotFoundException('No se encontraron tickets');
            return tickets;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOneByQr(qr) {
        try {
            const ticket = await this.freeTicketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.user', 'user')
                .innerJoin('localities.event', 'event')
                .select(['ticket', 'localities', 'user', 'event.name', 'event.id'])
                .where('ticket.qr=:qr', { qr })
                .getOne();
            if (!ticket)
                throw new common_1.NotFoundException('El ticket no existe');
            if (ticket.status === ticket_status_enum_1.TicketStatus.SCAN)
                throw new common_1.BadRequestException('El ticket ya a sido scaneado');
            ticket.status = ticket_status_enum_1.TicketStatus.SCAN;
            this.freeTicketRepository.save(ticket);
            return ticket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async verifyTicketExist(user, locality) {
        try {
            const userId = user.id;
            const ticket = await this.freeTicketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.user', 'user')
                .innerJoin('localities.event', 'event')
                .select(['ticket', 'localities', 'user', 'event'])
                .where('user.id=:userId', { userId })
                .andWhere('localities.id=:locality', { locality })
                .getOne();
            if (!ticket) {
                return await this.create({
                    locality,
                    user,
                });
            }
            return ticket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
FreeTicketsService = FreeTicketsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(free_ticket_entity_1.FreeTicket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        localities_service_1.LocalitiesService,
        user_service_1.UserService])
], FreeTicketsService);
exports.FreeTicketsService = FreeTicketsService;
//# sourceMappingURL=free-tickets.service.js.map