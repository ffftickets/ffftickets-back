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
var LicenseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const license_entity_1 = require("./entities/license.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let LicenseService = LicenseService_1 = class LicenseService {
    constructor(licenseRepository, userService) {
        this.licenseRepository = licenseRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(LicenseService_1.name);
    }
    async create(createLicenseDto) {
        try {
            const user = await this.userService.findOne({
                id: createLicenseDto.user,
            });
            const userAdmin = await this.userService.findOne({
                id: createLicenseDto.userAdmin,
            });
            this.logger.log('Licencia para: ', user.email);
            createLicenseDto.user = user;
            createLicenseDto.userAdmin = userAdmin;
            const newLicense = this.licenseRepository.create(createLicenseDto);
            const license = await this.licenseRepository.save(newLicense);
            delete license.user.password;
            return license;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findAll() {
        try {
            const licenses = await this.licenseRepository
                .createQueryBuilder('license')
                .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
                .leftJoinAndSelect('license.userAdmin', 'userAdmin', 'license.userAdminId = userAdmin.id')
                .select([
                'license',
                'user.id',
                'user.email',
                'user.name',
                'user.phone',
                'user.identification',
                'user.province',
                'user.city',
                'user.address',
                'user.status',
                'user.gender',
                'userAdmin.id',
                'userAdmin.email',
                'userAdmin.name',
                'userAdmin.phone',
                'userAdmin.identification',
                'userAdmin.province',
                'userAdmin.city',
                'userAdmin.address',
                'userAdmin.status',
                'userAdmin.gender',
            ])
                .getMany();
            if (licenses.length === 0)
                throw new common_1.NotFoundException('No se encontraron licencias');
            return licenses;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findOne(id) {
        try {
            const license = await this.licenseRepository
                .createQueryBuilder('license')
                .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
                .leftJoinAndSelect('license.userAdmin', 'userAdmin', 'license.userAdminId = userAdmin.id')
                .where('license.id = :id', { id })
                .getOne();
            delete license.user.password;
            delete license.userAdmin.password;
            if (!license)
                throw new common_1.NotFoundException('No se encontró la licencia');
            return license;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async update(id, updateLicenseDto) {
        try {
            return await this.licenseRepository.update(id, Object.assign({}, updateLicenseDto));
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async remove(id) {
        try {
            await this.licenseRepository.update(id, {
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
LicenseService = LicenseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(license_entity_1.License)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], LicenseService);
exports.LicenseService = LicenseService;
//# sourceMappingURL=license.service.js.map