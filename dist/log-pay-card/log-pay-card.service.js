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
var LogPayCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogPayCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const log_pay_card_entity_1 = require("./entities/log-pay-card.entity");
const typeorm_2 = require("typeorm");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let LogPayCardService = LogPayCardService_1 = class LogPayCardService {
    constructor(logPayCardRepository) {
        this.logPayCardRepository = logPayCardRepository;
        this.logger = new common_1.Logger(LogPayCardService_1.name);
    }
    async create(createLogPayCardDto) {
        try {
            this.logger.log('Creando registro de pago de tarjeta');
            return await this.logPayCardRepository.save(createLogPayCardDto);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
LogPayCardService = LogPayCardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_pay_card_entity_1.CreateLogPayCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LogPayCardService);
exports.LogPayCardService = LogPayCardService;
//# sourceMappingURL=log-pay-card.service.js.map