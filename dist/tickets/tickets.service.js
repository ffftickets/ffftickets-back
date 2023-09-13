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
var TicketsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const typeorm_2 = require("typeorm");
const localities_service_1 = require("../localities/localities.service");
const uuid_1 = require("uuid");
const ticket_status_enum_1 = require("./enum/ticket-status.enum");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const sale_status_enum_1 = require("../sales/enum/sale-status.enum");
const free_tickets_service_1 = require("../free-tickets/free-tickets.service");
const encryption_service_1 = require("../encryption/encryption.service");
let TicketsService = TicketsService_1 = class TicketsService {
    constructor(ticketRepository, localitiesService, freeTicketService, encryptionService) {
        this.ticketRepository = ticketRepository;
        this.localitiesService = localitiesService;
        this.freeTicketService = freeTicketService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(TicketsService_1.name);
    }
    async create(createTicketDto) {
        try {
            const tickets = [];
            for (const element of createTicketDto.detail) {
                for (let i = 0; i < element.quantity; i++) {
                    const ticket = {
                        sale: createTicketDto.sale,
                        qr: await (0, uuid_1.v4)(),
                        locality: element.locality,
                        status: ticket_status_enum_1.TicketStatus.ACTIVE,
                    };
                    const data = await this.ticketRepository.create(ticket);
                    const newTicket = await this.ticketRepository.save(data);
                    delete newTicket.locality.event;
                    newTicket.sale = createTicketDto.sale.id;
                    tickets.push(newTicket);
                }
                this.localitiesService.updateSold(element.locality.id, element.locality.sold + element.quantity);
            }
            return tickets;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async deleteTicketsAndUpdateLocalities(ventaData, saleId) {
        try {
            this.logger.log('Eliminando tickets y agregando localidades');
            const ticketsToDelete = await this.findBySale(saleId);
            if (ticketsToDelete.length !== 0) {
                ticketsToDelete.forEach(async (element) => {
                    await this.ticketRepository.update(element.id, { status: ticket_status_enum_1.TicketStatus.CANCELED });
                });
            }
            const localidades = await this.localitiesService.findOne(ventaData.localityId);
            this.localitiesService.updateSold(ventaData.localityId, localidades.sold - ventaData.ticketCount);
            return 'Tickets deleted and locality updated successfully';
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll() {
        try {
            const tickets = await this.ticketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.sale', 'sale')
                .innerJoin('sale.event', 'event')
                .select(['ticket', 'localities', 'sale', 'event'])
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
    async findOne(id) {
        try {
            const ticket = await this.ticketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.sale', 'sale')
                .innerJoin('sale.event', 'event')
                .select(['ticket', 'localities', 'sale', 'event'])
                .where('ticket.id=:id', { id })
                .getOne();
            if (!ticket)
                throw new common_1.NotFoundException('El ticket no existe');
            return ticket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOneByQR(qr) {
        try {
            const ticket = await this.ticketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.sale', 'sale')
                .innerJoin('sale.event', 'event')
                .select(['ticket', 'localities', 'sale', 'event'])
                .where('ticket.qr=:qr', { qr })
                .getOne();
            if (!ticket) {
                const data = await this.freeTicketService.findOneByQr(qr);
                return data;
            }
            if (ticket.status === ticket_status_enum_1.TicketStatus.SCAN)
                throw new common_1.BadRequestException('El ticket ya a sido scaneado');
            if (ticket.sale.status != sale_status_enum_1.SaleStatus.SOLD)
                throw new common_1.BadRequestException('La venta no a sido completada');
            ticket.status = ticket_status_enum_1.TicketStatus.SCAN;
            this.ticketRepository.save(ticket);
            return ticket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findBySale(id) {
        try {
            const ticket = await this.ticketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.sale', 'sale')
                .where('sale.id = :id', { id })
                .select(['ticket', 'localities'])
                .getMany();
            if (!ticket)
                throw new common_1.NotFoundException('El ticket no existe');
            const objetosEncriptados = await ticket.map(element => (Object.assign(Object.assign({}, element), { qr: this.encryptionService.decryptData(element.qr) })));
            return objetosEncriptados;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findByCustomer(id) {
        try {
            const ticket = await this.ticketRepository
                .createQueryBuilder('ticket')
                .innerJoin('ticket.locality', 'localities')
                .innerJoin('ticket.sale', 'sale')
                .innerJoin('sale.event', 'event')
                .select(['ticket', 'localities', 'sale', 'event'])
                .getMany();
            if (!ticket)
                throw new common_1.NotFoundException('El ticket no existe');
            return ticket;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    update(id, updateTicketDto) {
        return `This action updates a #${id} ticket`;
    }
    remove(id) {
        return `This action removes a #${id} ticket`;
    }
};
TicketsService = TicketsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        localities_service_1.LocalitiesService,
        free_tickets_service_1.FreeTicketsService,
        encryption_service_1.EncryptionService])
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map