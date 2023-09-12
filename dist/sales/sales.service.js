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
var SalesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sale_entity_1 = require("./entities/sale.entity");
const typeorm_2 = require("typeorm");
const event_service_1 = require("../event/event.service");
const user_service_1 = require("../user/user.service");
const tickets_service_1 = require("../tickets/tickets.service");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const localities_service_1 = require("../localities/localities.service");
const sale_status_enum_1 = require("./enum/sale-status.enum");
const firebase_service_1 = require("../firebase/firebase.service");
const encryption_service_1 = require("../encryption/encryption.service");
const pay_types_enum_1 = require("./enum/pay-types.enum");
const log_pay_card_service_1 = require("../log-pay-card/log-pay-card.service");
const mail_service_1 = require("../mail/mail.service");
const log_sale_service_1 = require("../log-sale/log-sale.service");
const sale_action_enum_1 = require("../log-sale/enum/sale-action.enum");
let SalesService = SalesService_1 = class SalesService {
    constructor(saleRepository, eventService, userService, ticketService, localitiesService, firebaseService, encryptionService, logPayCardService, mailService, logSaleService) {
        this.saleRepository = saleRepository;
        this.eventService = eventService;
        this.userService = userService;
        this.ticketService = ticketService;
        this.localitiesService = localitiesService;
        this.firebaseService = firebaseService;
        this.encryptionService = encryptionService;
        this.logPayCardService = logPayCardService;
        this.mailService = mailService;
        this.logSaleService = logSaleService;
        this.logger = new common_1.Logger(SalesService_1.name);
    }
    async create(createSaleDto, logSale) {
        try {
            const { tickets } = createSaleDto, createSale = __rest(createSaleDto, ["tickets"]);
            const event = await this.eventService.findOne(createSaleDto.event);
            createSaleDto.event = event;
            createSale.serviceValue = this.calculateServiceValue(tickets, event.commission);
            const verifyExist = await this.verifyPendingPurchase(createSale.customer.id);
            console.log("Tiene compras pendientes", verifyExist ? 'Si' : 'No');
            if (verifyExist) {
                if (verifyExist.sale.payType === pay_types_enum_1.PayTypes.TRANSFER && createSale.payType === pay_types_enum_1.PayTypes.TRANSFER) {
                    throw new common_1.ConflictException('Tu pedido no se pudo completar ya que actualmente tienes pedidos pendientes de validación.');
                }
                else {
                    console.log("Cancelando compra anterior");
                    logSale.action = sale_action_enum_1.ActionSale.CANCEL;
                    logSale.data = verifyExist;
                    this.logSaleService.create(logSale);
                    await this.deleteSaleAndTickets(verifyExist);
                }
            }
            let localityDataToEmail = [];
            let totalLocalities = 0;
            for (const element of tickets) {
                element.locality = await this.localitiesService.findOne(element.locality);
                localityDataToEmail.push({
                    name: element.locality.name,
                    quantity: element.quantity,
                    price: element.locality.total,
                });
                totalLocalities += element.locality.total * element.quantity;
                if (element.locality.capacity <
                    element.locality.sold + element.quantity)
                    throw new common_1.ConflictException(`Actualmente quedan ${element.locality.capacity - element.locality.sold} para la localidad ${element.locality.name}`);
            }
            if (createSale.promoter) {
                const promoter = await this.userService.findOne({
                    id: createSaleDto.promoter,
                });
                createSale.promoter = promoter;
            }
            createSale.total = createSale.serviceValue + totalLocalities;
            const sale = await this.saleRepository.create(createSale);
            const newSale = await this.saleRepository.save(sale);
            const newTickets = await this.ticketService.create({
                sale: newSale,
                detail: tickets,
            });
            logSale.action = sale_action_enum_1.ActionSale.CREATE;
            logSale.data = { newSale, newTickets };
            this.logSaleService.create(logSale);
            if (createSale.payType === pay_types_enum_1.PayTypes.TRANSFER) {
                const dataOrderGeneratedEmail = {
                    email: sale.customer.email,
                    event: event.name,
                    subtotal: totalLocalities,
                    serviceValue: sale.serviceValue,
                    total: sale.total,
                    order: sale.id,
                    localities: [...localityDataToEmail]
                };
                this.mailService.sendOrderGeneratedEmail(dataOrderGeneratedEmail);
            }
            return {
                message: 'Compra realizada con éxito y a la espera del pago a espera de pago',
                saleId: sale.id,
            };
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async deleteSaleAndTickets(saleDelete) {
        const { localities, sale } = saleDelete;
        for (const locality of localities) {
            await this.ticketService.deleteTicketsAndUpdateLocalities(locality, sale.id);
        }
        console.log("Eliminando venta", sale.id);
        await this.saleRepository.update(sale.id, { status: sale_status_enum_1.SaleStatus.CANCELED });
    }
    calculateServiceValue(tickets, commission) {
        let serviceValue = 0;
        for (const element of tickets) {
            serviceValue += element.quantity;
        }
        serviceValue = serviceValue * commission;
        return serviceValue + (serviceValue * 0);
    }
    async findAll(page = 1, limit = 10, status, paymentMethod) {
        try {
            const skip = (page - 1) * limit;
            const [sales, totalCount] = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .leftJoin('sale.promoter', 'promoter')
                .select([
                'sale',
                'customer.id',
                'customer.name',
                'customer.email',
                'promoter.id',
                'promoter.name',
                'promoter.email',
            ])
                .where('promoter.id IS NOT NULL OR promoter.id IS NULL')
                .orderBy('sale.id', 'DESC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encuentran ventas');
            }
            const decryptedSales = sales.map((sale) => {
                sale.customer.name = this.encryptionService.decryptData(sale.customer.name);
                sale.customer.email = this.encryptionService.decryptData(sale.customer.email);
                if (sale.promoter) {
                    sale.promoter.name = this.encryptionService.decryptData(sale.promoter.name);
                    sale.promoter.email = this.encryptionService.decryptData(sale.promoter.email);
                }
                return sale;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                sales: decryptedSales,
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
    async findAllByEvent(event, page = 1, limit = 10, status, paymentMethod) {
        try {
            const skip = (page - 1) * limit;
            const query = this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .leftJoin('sale.promoter', 'promoter')
                .select([
                'sale',
                'customer.id',
                'customer.name',
                'customer.email',
                'promoter.id',
                'promoter.name',
                'promoter.email',
            ])
                .where('promoter.id IS NOT NULL OR promoter.id IS NULL')
                .orderBy('sale.id', 'DESC')
                .andWhere('sale.event = :event', { event });
            if (status !== '') {
                query.andWhere('sale.status = :status', { status });
            }
            if (paymentMethod !== '') {
                query.andWhere('sale.payType = :paymentMethod', { paymentMethod });
            }
            const [sales, totalCount] = await query
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encuentran ventas');
            }
            const decryptedSales = sales.map((sale) => {
                sale.customer.name = this.encryptionService.decryptData(sale.customer.name);
                sale.customer.email = this.encryptionService.decryptData(sale.customer.email);
                if (sale.promoter) {
                    sale.promoter.name = this.encryptionService.decryptData(sale.promoter.name);
                    sale.promoter.email = this.encryptionService.decryptData(sale.promoter.email);
                }
                return sale;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                sales: decryptedSales,
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
    async findOne(id) {
        try {
            const sale = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoinAndSelect('sale.customer', 'customer')
                .leftJoinAndSelect('sale.promoter', 'promoter')
                .innerJoin('sale.event', 'event')
                .where('sale.id = :id', { id })
                .andWhere('(promoter.id IS NOT NULL OR promoter.id IS NULL)')
                .select([
                'sale',
                'customer.id',
                'customer.name',
                'customer.email',
                'promoter.id',
                'promoter.name',
                'promoter.email',
                'event.id',
            ])
                .getOne();
            if (!sale) {
                throw new common_1.NotFoundException('No se encontró la venta');
            }
            sale.customer.name = this.encryptionService.decryptData(sale.customer.name);
            sale.customer.email = this.encryptionService.decryptData(sale.customer.email);
            if (sale.promoter) {
                sale.promoter.name = this.encryptionService.decryptData(sale.promoter.name);
                sale.promoter.email = this.encryptionService.decryptData(sale.promoter.email);
            }
            return sale;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findByCustomer(id, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [sales, totalCount] = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.event', 'event')
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .where('customer.id = :customer', { customer: id })
                .andWhere('sale.status = :status', { status: sale_status_enum_1.SaleStatus.SOLD })
                .select([
                'sale.id',
                'sale.total',
                'ticket',
                'event.id',
                'event.name',
                'event.event_date',
                'event.hour',
                'event.poster',
                'event.geo_location',
                'event.address',
            ])
                .orderBy('sale.id', 'DESC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encontraron compras');
            }
            const modifiedData = sales.map((sale) => {
                const { tickets } = sale, rest = __rest(sale, ["tickets"]);
                const ticketCount = sale.tickets.length;
                return Object.assign(Object.assign({}, rest), { ticketCount });
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                sales: modifiedData,
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
    async verifyPendingPurchase(customer) {
        try {
            const sale = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.event', 'event')
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .where('customer.id=:customer', { customer })
                .andWhere('sale.status=:status', { status: sale_status_enum_1.SaleStatus.INCOMPLETE })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission'
            ])
                .getOne();
            if (!sale)
                return null;
            const localityTicketInfo = {};
            sale.tickets.forEach((ticket) => {
                const localityName = ticket.locality.name;
                const ticketPrice = ticket.locality.price;
                const localityId = ticket.locality.id;
                const total = ticket.locality.total;
                if (localityTicketInfo[localityName]) {
                    localityTicketInfo[localityName].ticketCount++;
                }
                else {
                    localityTicketInfo[localityName] = {
                        ticketCount: 1,
                        price: ticketPrice,
                        localityId: localityId,
                        total: total
                    };
                }
            });
            const result = Object.entries(localityTicketInfo).map(([localityName, ticketInfo]) => ({
                localityName,
                ticketCount: ticketInfo.ticketCount,
                price: ticketInfo.price,
                localityId: ticketInfo.localityId,
                total: ticketInfo.total
            }));
            delete sale.tickets;
            return { sale, localities: result };
        }
        catch (error) {
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async verifyInfoSaleWIthLocalities(saleId) {
        try {
            const sale = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.event', 'event')
                .innerJoin('sale.customer', 'user')
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .where('sale.id=:saleId', { saleId })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission',
                'user.name',
                'user.email',
                'user.phone',
                'user.identification',
            ])
                .getOne();
            if (!sale)
                return null;
            const localityTicketInfo = {};
            sale.tickets.forEach((ticket) => {
                const localityName = ticket.locality.name;
                const ticketPrice = ticket.locality.price;
                const localityId = ticket.locality.id;
                const total = ticket.locality.total;
                if (localityTicketInfo[localityName]) {
                    localityTicketInfo[localityName].ticketCount++;
                }
                else {
                    localityTicketInfo[localityName] = {
                        ticketCount: 1,
                        price: ticketPrice,
                        localityId: localityId,
                        total: total
                    };
                }
            });
            const result = Object.entries(localityTicketInfo).map(([localityName, ticketInfo]) => ({
                localityName,
                ticketCount: ticketInfo.ticketCount,
                price: ticketInfo.price,
                localityId: ticketInfo.localityId,
                total: ticketInfo.total
            }));
            delete sale.tickets;
            return { sale, localities: result };
        }
        catch (error) {
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async findByPromoter(id, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [sales, totalCount] = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.promoter', 'promoter')
                .where('promoter.id = :id', { id })
                .select([
                'sale',
                'customer.id',
                'customer.name',
                'customer.email',
                'promoter.id',
                'promoter.name',
                'promoter.email',
            ])
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            if (totalCount === 0) {
                throw new common_1.NotFoundException('No se encontraron ventas');
            }
            const decryptedSales = sales.map((sale) => {
                sale.customer.name = this.encryptionService.decryptData(sale.customer.name);
                sale.customer.email = this.encryptionService.decryptData(sale.customer.email);
                sale.promoter.name = this.encryptionService.decryptData(sale.promoter.name);
                sale.promoter.email = this.encryptionService.decryptData(sale.promoter.email);
                return sale;
            });
            const totalPages = Math.ceil(totalCount / limit);
            return {
                sales: decryptedSales,
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
    async uploadVoucher(id, user, uploadPhoto) {
        try {
            const event = await this.eventService.findOne(uploadPhoto.event);
            let img = await this.firebaseService.uploadBase64({
                route: `${user.id} - ${user.name}/voucher/${event.name}`,
                image: uploadPhoto.photo,
            });
            const sale = await this.findOne(id);
            if (sale.transfer_photo)
                await this.firebaseService.deleteImageByUrl(sale.transfer_photo);
            sale.transfer_photo = img.imageUrl;
            return await this.saleRepository.save(sale);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async validateSaleAdmin(id) {
        try {
            const sale = await this.findOne(id);
            sale.status = sale_status_enum_1.SaleStatus.SOLD;
            const data = await this.saleRepository.save(sale);
            this.generateDataToEmailCompleteOrder(id);
            this.generateDataToEmailTickets(id);
            return data;
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async updateSaleWIthCard(id, updateSaleCard) {
        try {
            const sale = await this.findOne(id);
            updateSaleCard.log.sale = sale;
            const { log } = updateSaleCard, updateData = __rest(updateSaleCard, ["log"]);
            this.logPayCardService.create(log);
            sale.status = sale_status_enum_1.SaleStatus.SOLD;
            sale.authorizationNumber = updateData.authorizationNumber;
            sale.transactionCode = updateData.transactionCode;
            sale.catwalkCommission = updateData.catwalkCommission;
            const dataSale = await this.saleRepository.save(sale);
            this.generateDataToEmailCompleteOrder(id);
            this.generateDataToEmailTickets(id);
            return 'Venta actualizada con éxito';
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    transformTicketsToLocalities(tickets) {
        const localityMap = {};
        for (const ticket of tickets) {
            const localityName = ticket.locality.name;
            const qr = this.encryptionService.encryptData(ticket.qr);
            if (!localityMap[localityName]) {
                localityMap[localityName] = {
                    localityName: localityName,
                    qrs: [qr],
                };
            }
            else {
                localityMap[localityName].qrs.push(qr);
            }
        }
        return Object.values(localityMap);
    }
    async generateDataToEmailCompleteOrder(id) {
        const data = await this.verifyInfoSaleWIthLocalities(id);
        console.log(data);
        let totalLocalidades = 0;
        data.localities.forEach(element => {
            totalLocalidades += parseFloat((element.total * element.ticketCount).toFixed(2));
        });
        const newLocalities = data.localities.map((locality) => ({
            name: locality.localityName,
            price: parseFloat(locality.total),
            quantity: locality.ticketCount
        }));
        const payTypeToPayNameMap = {
            [pay_types_enum_1.PayTypes.TRANSFER]: 'Transferencia',
            [pay_types_enum_1.PayTypes.CREDIT_CARD]: 'Tarjeta',
            [pay_types_enum_1.PayTypes.DEBIT_CARD]: 'Tarjeta',
            [pay_types_enum_1.PayTypes.PAY_PHONE]: 'Pago por celular',
        };
        const PayName = payTypeToPayNameMap[data.sale.payType] || 'Método no especificado';
        const payNumber = data.sale.authorizationNumber || null;
        const dataEmail = {
            order: data.sale.id,
            email: this.encryptionService.decryptData(data.sale.customer.email),
            event: data.sale.event.name,
            subtotal: totalLocalidades,
            serviceValue: data.sale.serviceValue,
            total: data.sale.total,
            localities: [...newLocalities],
            customer: {
                name: this.encryptionService.decryptData(data.sale.customer.name),
                phone: this.encryptionService.decryptData(data.sale.customer.phone),
                ci: this.encryptionService.decryptData(data.sale.customer.identification),
                address: this.encryptionService.decryptData(data.sale.customer.address || '')
            },
            pay: {
                name: PayName,
                number: payNumber
            }
        };
        this.mailService.sendOrderCompletedEmail(dataEmail);
    }
    async generateDataToEmailTickets(idSale) {
        const dataSale = await this.findOne(idSale);
        const dataEvent = await this.eventService.findOne(dataSale.event.id);
        const dataLocalities = await this.ticketService.findBySale(dataSale.id);
        const localities = this.transformTicketsToLocalities(dataLocalities);
        const dataSendEmail = {
            email: dataSale.customer.email,
            name: dataSale.customer.name,
            event: {
                name: dataEvent.name,
                event_date: dataEvent.event_date,
                place: dataEvent.address,
                poster: dataEvent.poster,
                user: { name: dataEvent.user.name }
            },
            sale: { id: dataSale.id },
            localities: [...localities]
        };
        this.mailService.sendTicketsEmail(dataSendEmail);
    }
};
SalesService = SalesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_service_1.EventService,
        user_service_1.UserService,
        tickets_service_1.TicketsService,
        localities_service_1.LocalitiesService,
        firebase_service_1.FirebaseService,
        encryption_service_1.EncryptionService,
        log_pay_card_service_1.LogPayCardService,
        mail_service_1.MailService,
        log_sale_service_1.LogSaleService])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=sales.service.js.map