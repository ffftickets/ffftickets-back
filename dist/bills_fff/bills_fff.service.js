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
var BillsFffService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsFffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bills_fff_entity_1 = require("./entities/bills_fff.entity");
const typeorm_2 = require("typeorm");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let BillsFffService = BillsFffService_1 = class BillsFffService {
    constructor(billRepository) {
        this.billRepository = billRepository;
        this.logger = new common_1.Logger(BillsFffService_1.name);
    }
    create(createBillsFffDto) {
        try {
            this.logger.log('creando factura');
            const data = this.billRepository.create(createBillsFffDto);
            return this.billRepository.save(data);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const query = this.billRepository
                .createQueryBuilder('bill')
                .innerJoin('bill.sale', 'sale')
                .select([
                'bill',
                'sale',
            ])
                .orderBy('bill.updatedAt', 'DESC');
            const [bills, totalCount] = await query
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encuentran facturas');
            }
            const totalPages = Math.ceil(totalCount / limit);
            return {
                bills: bills,
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
    findOne(id) {
        return `This action returns a #${id} billsFff`;
    }
    async update(sale, status) {
        try {
            const data = await this.billRepository
                .createQueryBuilder('bill')
                .where(`bill.sale = :sale`, { sale })
                .getOne();
            data.status = status;
            return this.billRepository.save(data);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    remove(id) {
        return `This action removes a #${id} billsFff`;
    }
};
BillsFffService = BillsFffService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bills_fff_entity_1.BillsFff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BillsFffService);
exports.BillsFffService = BillsFffService;
//# sourceMappingURL=bills_fff.service.js.map