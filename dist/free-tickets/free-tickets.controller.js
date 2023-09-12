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
var FreeTicketsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeTicketsController = void 0;
const common_1 = require("@nestjs/common");
const free_tickets_service_1 = require("./free-tickets.service");
const create_free_ticket_dto_1 = require("./dto/create-free-ticket.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/helpers/decorators");
const user_entity_1 = require("../user/entities/user.entity");
let FreeTicketsController = FreeTicketsController_1 = class FreeTicketsController {
    constructor(freeTicketsService) {
        this.freeTicketsService = freeTicketsService;
        this.logger = new common_1.Logger(FreeTicketsController_1.name);
    }
    async create(createFreeTicketDto, user) {
        this.logger.log('Creando ticket gratuito');
        createFreeTicketDto.user = user;
        return await this.freeTicketsService.create(createFreeTicketDto);
    }
    async findAll() {
        return await this.freeTicketsService.findAll();
    }
    async findOne(qr) {
        return await this.freeTicketsService.findOneByQr(qr);
    }
    async findByUser(user) {
        return await this.freeTicketsService.findByUser(user.id);
    }
    async verifyTicketExist(location, user) {
        return await this.freeTicketsService.verifyTicketExist(user, location);
    }
};
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_free_ticket_dto_1.CreateFreeTicketDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FreeTicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FreeTicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('qrcode/:qr'),
    __param(0, (0, common_1.Param)('qr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FreeTicketsController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('findByUser'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FreeTicketsController.prototype, "findByUser", null);
__decorate([
    (0, decorators_1.Auth)(),
    (0, common_1.Get)('verifyTicketExist/:location'),
    __param(0, (0, common_1.Param)('location')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FreeTicketsController.prototype, "verifyTicketExist", null);
FreeTicketsController = FreeTicketsController_1 = __decorate([
    (0, swagger_1.ApiTags)('FreeTickets'),
    (0, common_1.Controller)('free-tickets'),
    __metadata("design:paramtypes", [free_tickets_service_1.FreeTicketsService])
], FreeTicketsController);
exports.FreeTicketsController = FreeTicketsController;
//# sourceMappingURL=free-tickets.controller.js.map