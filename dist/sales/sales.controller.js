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
var SalesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const create_sale_dto_1 = require("./dto/create-sale.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/helpers/decorators");
const user_entity_1 = require("../user/entities/user.entity");
const uploadPhoto_dto_1 = require("./dto/uploadPhoto.dto");
const pay_types_enum_1 = require("./enum/pay-types.enum");
const update_sale_card_1 = require("./dto/update-sale-card");
const interceptors_1 = require("../common/interceptors");
const log_sale_service_1 = require("../log-sale/log-sale.service");
const sale_action_enum_1 = require("../log-sale/enum/sale-action.enum");
const encryption_service_1 = require("../encryption/encryption.service");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let SalesController = SalesController_1 = class SalesController {
    constructor(salesService, logSaleService, encryptionService) {
        this.salesService = salesService;
        this.logSaleService = logSaleService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(SalesController_1.name);
    }
    async create(createSaleDto, res, req, user) {
        this.logger.log(`Creando nueva venta:`);
        const logSale = {
            action: sale_action_enum_1.ActionSale.CREATE,
            data: createSaleDto,
            user: user.email,
            ipDetail: req['ip-details'],
            userAgent: req['ua'],
        };
        createSaleDto.customer = user;
        const data = await this.salesService.create(createSaleDto, logSale);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res, page = 1, limit = 10, status, paymentMethod) {
        this.logger.log(`Buscando todas las ventas`);
        const data = await this.salesService.findAll(page, limit, status, paymentMethod);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAllByEvent(res, id, page = 1, limit = 10, status, paymentMethod) {
        this.logger.log(`Buscando todas las ventas`);
        const data = await this.salesService.findAllByEvent(id, page, limit, status, paymentMethod);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        this.logger.log(`Buscando venta: ${id}`);
        const data = await this.salesService.findOne(id);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findByCustomer(res, user, page = 1, limit = 10) {
        this.logger.log(`Buscando venta por usuario: ${user.email}`);
        const data = await this.salesService.findByCustomer(user.id, page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findByPromoter(promoter, res, page = 1, limit = 10) {
        this.logger.log(`Buscando venta por promotor: ${promoter}`);
        const data = await this.salesService.findByPromoter(promoter, page, limit);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async verifyPendingPurchase(res, user) {
        try {
            this.logger.log(`Buscando ventas pendientes de: ${user.email}`);
            const data = await this.salesService.verifyPendingPurchases(user.id);
            if (!data || data.length === 0) {
                throw new common_1.NotFoundException('No se encontraron órdenes pendientes');
            }
            const transferSale = data.find(sale => sale.sale.payType === pay_types_enum_1.PayTypes.TRANSFER);
            if (!transferSale) {
                throw new common_1.NotFoundException('No se encontraron órdenes pendientes de tipo transferencia');
            }
            console.log(transferSale);
            return res.status(common_1.HttpStatus.OK).json(transferSale);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async uploadVoucher(id, uploadPhoto, req, user) {
        this.logger.log('Subiendo comprobante de venta');
        const logSale = {
            action: sale_action_enum_1.ActionSale.UPDATE,
            data: { saleUpdate: id, description: 'Subiendo comprobante de venta' },
            user: user.email,
            ipDetail: req['ip-details'],
            userAgent: req['ua'],
        };
        this.logSaleService.create(logSale);
        return await this.salesService.uploadVoucher(id, user, uploadPhoto);
    }
    async validateSaleAdmin(id, req, user, body) {
        this.logger.log('Validando venta' + id);
        const data = await this.salesService.validateSaleAdmin(id, body);
        const logSale = {
            action: sale_action_enum_1.ActionSale.UPDATE,
            data: { saleUpdate: id, description: 'Validando venta por el administrador' },
            user: user.email,
            ipDetail: req['ip-details'],
            userAgent: req['ua'],
        };
        this.logSaleService.create(logSale);
        return data;
    }
    async validateSaleUser(id, updateSaleCard, req, res, user) {
        this.logger.log('Validando venta' + id);
        updateSaleCard.log.ipDetail = req['ip-details'];
        updateSaleCard.log.userAgent = req['ua'];
        const logSale = {
            action: sale_action_enum_1.ActionSale.UPDATE,
            data: { updateSaleCard, description: 'Validando venta por el usuario con tarjeta' },
            user: user.email,
            ipDetail: req['ip-details'],
            userAgent: req['ua'],
        };
        this.logSaleService.create(logSale);
        const data = await this.salesService.updateSaleWIthCard(id, updateSaleCard);
        return res.status(common_1.HttpStatus.OK).json(data);
        ;
    }
};
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto, Object, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('payment_method')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find/event'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('id')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('payment_method')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findAllByEvent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('find/customer'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Number, Number]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findByCustomer", null);
__decorate([
    (0, common_1.Get)('promoter/:promoter'),
    __param(0, (0, common_1.Param)('promoter')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findByPromoter", null);
__decorate([
    (0, common_1.Get)('verify/pending-purchase'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "verifyPendingPurchase", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Patch)('uploadVoucher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, uploadPhoto_dto_1.UploadPhotoDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "uploadVoucher", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Patch)(':id/validate/admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, decorators_1.GetUser)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "validateSaleAdmin", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.IpDetailsInterceptor),
    (0, common_1.Patch)(':id/validate/user'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sale_card_1.UpdateSaleCard, Object, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "validateSaleUser", null);
SalesController = SalesController_1 = __decorate([
    (0, decorators_1.Auth)(),
    (0, swagger_1.ApiTags)('Ventas'),
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService,
        log_sale_service_1.LogSaleService,
        encryption_service_1.EncryptionService])
], SalesController);
exports.SalesController = SalesController;
//# sourceMappingURL=sales.controller.js.map