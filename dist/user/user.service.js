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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const enums_1 = require("../core/enums");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const identification_type_enum_1 = require("./emun/identification-type.enum");
const encryption_service_1 = require("../encryption/encryption.service");
const event_service_1 = require("../event/event.service");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
let UserService = UserService_1 = class UserService {
    constructor(userRepository, encryptionService, eventService, mailService) {
        this.userRepository = userRepository;
        this.encryptionService = encryptionService;
        this.eventService = eventService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async create(createUserDto) {
        try {
            const newUser = this.userRepository.create(await this.encryptUser(createUserDto));
            const user = await this.userRepository.save(newUser);
            this.mailService.registerEmail({
                email: createUserDto.email,
                name: createUserDto.name,
            });
            return this.encryptionService.decryptData(user.email);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async createSeedUser() {
        try {
            const users = [
                {
                    email: 'avillegas7510@gmail.com',
                    password: '12345678',
                    name: 'Alex Villegas',
                    phone: '099952397',
                    identification: '23006817510',
                    province: 'Tungurahua',
                    city: 'Ambato',
                    address: 'Ambato',
                    roles: ['ADMIN'],
                    status: 'ACTIVE',
                    isActive: true,
                    birthdate: '2023-05-28T02:31:07.313Z',
                    gender: 'MASCULINO',
                    terms: true,
                    identificationType: identification_type_enum_1.IdentificationType.CEDULA,
                    photo: 'http',
                },
            ];
            const encryptedUsers = await this.encryptUsersList(users);
            const newUsers = this.userRepository.create(encryptedUsers);
            const savedUsers = await this.userRepository.save(newUsers);
            return true;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async encryptUser(user) {
        const encryptedUser = Object.assign({}, user);
        encryptedUser.name = await this.encryptionService.encryptData(user.name);
        encryptedUser.email = await this.encryptionService.encryptData(user.email);
        encryptedUser.identification = await this.encryptionService.encryptData(user.identification);
        if (user.phone) {
            encryptedUser.phone = await this.encryptionService.encryptData(user.phone);
        }
        if (user.address) {
            encryptedUser.address = await this.encryptionService.encryptData(user.address);
        }
        return encryptedUser;
    }
    async encryptUsersList(users) {
        const encryptedUsers = [];
        for (const user of users) {
            const encryptedUser = await this.encryptUser(user);
            encryptedUsers.push(encryptedUser);
        }
        return encryptedUsers;
    }
    async findAll(page = 1, limit = 10, role) {
        try {
            const skip = (page - 1) * limit;
            let whereClause = {};
            if (role) {
                whereClause = {
                    roles: (0, typeorm_2.Like)(`%${role}%`),
                };
            }
            const [data, totalCount] = await this.userRepository.findAndCount({
                skip,
                take: limit,
                where: whereClause,
            });
            if (totalCount === 0)
                throw new common_1.NotFoundException('No se encontraron usuarios');
            const decryptedData = await Promise.all(data.map(async (user) => {
                if (user.address) {
                    user.address = this.encryptionService.decryptData(user.address);
                }
                if (user.phone) {
                    user.phone = this.encryptionService.decryptData(user.phone);
                }
                user.email = this.encryptionService.decryptData(user.email);
                user.name = this.encryptionService.decryptData(user.name);
                user.identification = this.encryptionService.decryptData(user.identification);
                if (role === 'ORGANIZER') {
                    const eventCount = await this.eventService.countEventsForUser(user.id);
                    user.eventCount = eventCount;
                }
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return userWithoutPassword;
            }));
            const totalPages = Math.ceil(totalCount / limit);
            return {
                users: decryptedData,
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
    async findOne(data) {
        try {
            if (data.email)
                data.email = this.encryptionService.encryptData(data.email);
            if (data.identification)
                data.email = this.encryptionService.encryptData(data.identification);
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where(data)
                .addSelect('user.password')
                .getOne();
            if (!user)
                throw new common_1.NotFoundException('No se encontró al usuario');
            if (user.address)
                user.address = this.encryptionService.decryptData(user.address);
            if (user.phone)
                user.phone = this.encryptionService.decryptData(user.phone);
            user.email = this.encryptionService.decryptData(user.email);
            user.name = this.encryptionService.decryptData(user.name);
            user.identification = this.encryptionService.decryptData(user.identification);
            delete user.password;
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findUserByLogin(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user)
                throw new common_1.NotFoundException('No se encontró al usuario');
            if (user.address)
                user.address = this.encryptionService.decryptData(user.address);
            if (user.phone)
                user.phone = this.encryptionService.decryptData(user.phone);
            user.email = this.encryptionService.decryptData(user.email);
            user.name = this.encryptionService.decryptData(user.name);
            user.identification = this.encryptionService.decryptData(user.identification);
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.findOne({ id });
            if (updateUserDto.address)
                user.address = this.encryptionService.encryptData(updateUserDto.address);
            user.city = updateUserDto.city;
            if (updateUserDto.phone)
                user.phone = this.encryptionService.encryptData(updateUserDto.phone);
            user.province = updateUserDto.province;
            user.password = updateUserDto.password;
            user.status = updateUserDto.status;
            if (updateUserDto.roles)
                user.roles = updateUserDto.roles;
            await this.userRepository.save(user);
            delete user.password;
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    updateRol(id, updateUserDto) {
        try {
            const user = this.userRepository.update(id, {
                roles: updateUserDto.roles,
            });
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async remove(id) {
        try {
            await this.userRepository.update(id, { isActive: false });
            const user = await this.findOne({ id });
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async blockUser(id) {
        try {
            return await this.userRepository.update(id, {
                status: enums_1.UserStatus.BLOCKED,
            });
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async unblockUser(id) {
        try {
            const user = await this.findOne({ id });
            const data = await this.userRepository.update(id, {
                status: enums_1.UserStatus.ACTIVE,
            });
            user.status = enums_1.UserStatus.ACTIVE;
            return user;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async updateLastLogin(id) {
        try {
            return await this.userRepository.update(id, {
                lastLogin: () => 'CURRENT_TIMESTAMP',
            });
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async recoverPassword(email, identification) {
        try {
            email = this.encryptionService.encryptData(email);
            identification = this.encryptionService.encryptData(identification);
            const data = await this.userRepository.findOne({ where: { email, identification } });
            if (!data)
                throw new common_1.ConflictException('Los datos ingresados no coinciden');
            const min = 8;
            const max = 14;
            const lengthPassword = Math.floor(Math.random() * (max - min + 1)) + min;
            const newPassword = this.generateAlphanumericPassword(lengthPassword);
            data.password = newPassword;
            const dataUpdate = await this.userRepository.save(data);
            this.mailService.newPasswordEmail({ email: this.encryptionService.decryptData(email), newPassword });
            return { message: 'Se ha enviado un correo con la nueva contraseña' };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    generateAlphanumericPassword(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        return password;
    }
    async changePassword(body) {
        try {
            let { email, oldPassword, newPassword } = body;
            this.logger.log('Cambiando contraseña: ', email);
            email = this.encryptionService.encryptData(email);
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user)
                throw new common_1.NotFoundException('No se encontró al usuario');
            if (!await bcrypt.compare(oldPassword, user.password))
                throw new common_1.ConflictException('La contraseña actual no coincide');
            user.password = newPassword;
            await this.userRepository.save(user);
            this.mailService.passwordChangedEmail(this.encryptionService.decryptData(email));
            return { message: 'Se ha cambiado la contraseña' };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService,
        event_service_1.EventService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map