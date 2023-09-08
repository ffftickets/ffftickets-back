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
var TicketsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const update_ticket_dto_1 = require("./dto/update-ticket.dto");
const swagger_1 = require("@nestjs/swagger");
let TicketsController = TicketsController_1 = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
        this.logger = new common_1.Logger(TicketsController_1.name);
    }
    async findAll(res) {
        const data = await this.ticketsService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        const data = await this.ticketsService.findOne(id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findByQR(qr, res) {
        const data = await this.ticketsService.findOneByQR(qr);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findByEvent(sale, res) {
        const data = await this.ticketsService.findBySale(sale);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    update(id, updateTicketDto) {
        return this.ticketsService.update(+id, updateTicketDto);
    }
    remove(id) {
        return this.ticketsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/qr/:qr'),
    __param(0, (0, common_1.Param)('qr')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findByQR", null);
__decorate([
    (0, common_1.Get)('/sale/:sale'),
    __param(0, (0, common_1.Param)('sale')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findByEvent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
TicketsController = TicketsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map