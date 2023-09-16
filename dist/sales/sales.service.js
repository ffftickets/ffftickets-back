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
const encryption_service_1 = require("../encryption/encryption.service");
const pay_types_enum_1 = require("./enum/pay-types.enum");
const log_pay_card_service_1 = require("../log-pay-card/log-pay-card.service");
const mail_service_1 = require("../mail/mail.service");
const log_sale_service_1 = require("../log-sale/log-sale.service");
const sale_action_enum_1 = require("../log-sale/enum/sale-action.enum");
const amazon_s3_service_1 = require("../amazon-s3/amazon-s3.service");
const bills_fff_service_1 = require("../bills_fff/bills_fff.service");
const status_bill_dto_1 = require("../bills_fff/enums/status-bill.dto");
const date_fns_tz_1 = require("date-fns-tz");
const schedule_1 = require("@nestjs/schedule");
const { format } = require('date-fns');
let SalesService = SalesService_1 = class SalesService {
    constructor(saleRepository, eventService, userService, ticketService, localitiesService, encryptionService, logPayCardService, mailService, logSaleService, amazon3SService, billsFffService) {
        this.saleRepository = saleRepository;
        this.eventService = eventService;
        this.userService = userService;
        this.ticketService = ticketService;
        this.localitiesService = localitiesService;
        this.encryptionService = encryptionService;
        this.logPayCardService = logPayCardService;
        this.mailService = mailService;
        this.logSaleService = logSaleService;
        this.amazon3SService = amazon3SService;
        this.billsFffService = billsFffService;
        this.logger = new common_1.Logger(SalesService_1.name);
        this.findPendingPurchasesTransfersAndCancel();
        this.findPendingPurchasesCardsAndCancel();
    }
    onApplicationBootstrap() {
        this.findPendingPurchasesTransfersAndCancel();
        this.findPendingPurchasesCardsAndCancel();
    }
    async create(createSaleDto, logSale) {
        try {
            const { tickets, bill } = createSaleDto, createSale = __rest(createSaleDto, ["tickets", "bill"]);
            const event = await this.eventService.findOne(createSaleDto.event);
            createSaleDto.event = event;
            createSale.serviceValue = this.calculateServiceValue(tickets, event.commission);
            const verifyExist = await this.verifyPendingPurchase(createSale.customer.id);
            console.log('Tiene compras pendientes', verifyExist ? 'Si' : 'No');
            if (verifyExist) {
                if (verifyExist.sale.payType === pay_types_enum_1.PayTypes.TRANSFER &&
                    createSale.payType === pay_types_enum_1.PayTypes.TRANSFER) {
                    throw new common_1.ConflictException('Tu pedido no se pudo completar ya que actualmente tienes pedidos pendientes de validación.');
                }
                else if (verifyExist.sale.payType === pay_types_enum_1.PayTypes.DEBIT_CARD) {
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
                    localities: [...localityDataToEmail],
                };
                this.mailService.sendOrderGeneratedEmail(dataOrderGeneratedEmail);
            }
            const { precioSinIVA, ivaPagado } = this.calcularPrecioConIVA(event.iva, totalLocalities);
            const dataBill = Object.assign(Object.assign({}, bill), { sale: sale, total_o: precioSinIVA, iva_o: ivaPagado, total_fff: sale.serviceValue, iva_fff: 0, total: sale.total, status: status_bill_dto_1.StatusBill.PENDING });
            this.billsFffService.create(dataBill);
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
    calcularPrecioConIVA(iva, valor) {
        if (iva) {
            const porcentajeIVA = 1.12;
            const porcentaje = valor / porcentajeIVA;
            const ivaPagado = valor - porcentaje;
            const precioSinIVA = valor - ivaPagado;
            return { precioSinIVA, ivaPagado };
        }
        else {
            return { precioSinIVA: valor, ivaPagado: 0 };
        }
    }
    async deleteSaleAndTickets(saleDelete) {
        const { localities, sale } = saleDelete;
        console.log('Cancelando Tickets', sale.id);
        for (const locality of localities) {
            await this.ticketService.deleteTicketsAndUpdateLocalities(locality, sale.id);
        }
        console.log('Cancelando venta', sale.id);
        sale.status = sale_status_enum_1.SaleStatus.CANCELED;
        await this.saleRepository.save(sale);
    }
    calculateServiceValue(tickets, commission) {
        let serviceValue = 0;
        for (const element of tickets) {
            serviceValue += element.quantity;
        }
        serviceValue = serviceValue * commission;
        return serviceValue + serviceValue * 0;
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
                .orderBy('sale.updatedAt', 'DESC')
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
                .andWhere('(sale.status = :incompleteStatus OR sale.status = :rejectedStatus)', {
                incompleteStatus: sale_status_enum_1.SaleStatus.INCOMPLETE,
                rejectedStatus: sale_status_enum_1.SaleStatus.REJECTED,
            })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission',
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
                        total: total,
                    };
                }
            });
            const result = Object.entries(localityTicketInfo).map(([localityName, ticketInfo]) => ({
                localityName,
                ticketCount: ticketInfo.ticketCount,
                price: ticketInfo.price,
                localityId: ticketInfo.localityId,
                total: ticketInfo.total,
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
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .leftJoinAndSelect('sale.bill', 'bills_fff')
                .where('sale.id=:saleId', { saleId })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission',
                'customer.email',
                'bills_fff',
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
                        total: total,
                    };
                }
            });
            const result = Object.entries(localityTicketInfo).map(([localityName, ticketInfo]) => ({
                localityName,
                ticketCount: ticketInfo.ticketCount,
                price: ticketInfo.price,
                localityId: ticketInfo.localityId,
                total: ticketInfo.total,
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
            let img = await this.amazon3SService.uploadBase64({
                route: `${user.id} - ${user.name}/voucher/${event.name}`,
                image: uploadPhoto.photo,
            });
            const sale = await this.findOne(id);
            if (sale.transfer_photo)
                await this.amazon3SService.deleteImageByUrl(sale.transfer_photo);
            sale.transfer_photo = img.imageUrl;
            return await this.saleRepository.save(sale);
        }
        catch (error) {
            this.logger.error(error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async validateSaleAdmin(id, body) {
        try {
            const { transactionCode } = body;
            console.log('Código transacción: ', transactionCode);
            const dateExistWithTransactionCode = await this.saleRepository.findOne({
                where: { transactionCode },
            });
            if (dateExistWithTransactionCode)
                throw new common_1.ConflictException('El código de transacción ya existe en la compra: ' +
                    dateExistWithTransactionCode.id);
            const sale = await this.findOne(id);
            sale.status = sale_status_enum_1.SaleStatus.SOLD;
            sale.transactionCode = transactionCode;
            console.log(sale);
            const data = await this.saleRepository.save(sale);
            this.generateDataToEmailCompleteOrder(id);
            this.generateDataToEmailTickets(id);
            return data;
        }
        catch (error) {
            console.log('Se fue al error');
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
        try {
            const data = await this.verifyInfoSaleWIthLocalities(id);
            let totalLocalidades = 0;
            data.localities.forEach((element) => {
                totalLocalidades += parseFloat((element.total * element.ticketCount).toFixed(2));
            });
            const newLocalities = data.localities.map((locality) => ({
                name: locality.localityName,
                price: parseFloat(locality.total),
                quantity: locality.ticketCount,
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
                    name: data.sale.bill[0].name,
                    phone: data.sale.bill[0].phone,
                    ci: data.sale.bill[0].identification,
                    address: data.sale.bill[0].address,
                },
                pay: {
                    name: PayName,
                    number: payNumber,
                },
            };
            this.mailService.sendOrderCompletedEmail(dataEmail);
            this.billsFffService.update(data.sale.id, status_bill_dto_1.StatusBill.PAID);
        }
        catch (error) {
            console.log(error);
        }
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
                user: { name: dataEvent.user.name },
            },
            sale: { id: dataSale.id },
            localities: [...localities],
        };
        this.mailService.sendTicketsEmail(dataSendEmail);
    }
    async findPendingPurchasesTransfersAndCancel() {
        try {
            this.logger.log('Tarea ejecutada cada 5 horas');
            this.logger.log('Buscando compras pendientes de pago por transferencia');
            const zonaHorariaEcuador = 'America/Guayaquil';
            const fechaActualUTC = new Date();
            const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
            const fechaRestada = new Date(fechaActualEcuador.getTime() - 48 * 60 * 60 * 1000);
            const expiredPurchases = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.event', 'event')
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .where('sale.updatedAt < :cutoffTime', {
                cutoffTime: fechaRestada.toISOString(),
            })
                .andWhere('(sale.status = :incompleteStatus OR sale.status = :rejectedStatus)', {
                incompleteStatus: sale_status_enum_1.SaleStatus.INCOMPLETE,
                rejectedStatus: sale_status_enum_1.SaleStatus.REJECTED,
            })
                .andWhere('sale.payType = :payType', {
                payType: pay_types_enum_1.PayTypes.TRANSFER,
            })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission',
            ])
                .getMany();
            if (expiredPurchases.length > 0) {
                console.log('Cancelando compras pendientes de pago por transferencia');
                this.CancelSalesForLotes(expiredPurchases, pay_types_enum_1.PayTypes.TRANSFER);
            }
            return expiredPurchases;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findPendingPurchasesCardsAndCancel() {
        try {
            this.logger.log('Tarea ejecutada cada 30 minutos horas');
            this.logger.log('Buscando compras pendientes de pago por tarjeta');
            const zonaHorariaEcuador = 'America/Guayaquil';
            const fechaActualUTC = new Date();
            const fechaActualEcuador = (0, date_fns_tz_1.utcToZonedTime)(fechaActualUTC, zonaHorariaEcuador);
            const fechaRestada = new Date(fechaActualEcuador.getTime() - 30 * 60 * 1000);
            const expiredPurchases = await this.saleRepository
                .createQueryBuilder('sale')
                .innerJoin('sale.customer', 'customer')
                .innerJoin('sale.event', 'event')
                .leftJoinAndSelect('sale.tickets', 'ticket')
                .leftJoinAndSelect('ticket.locality', 'locality')
                .where('sale.updatedAt < :cutoffTime', {
                cutoffTime: fechaRestada.toISOString(),
            })
                .andWhere('sale.status = :incompleteStatus', {
                incompleteStatus: sale_status_enum_1.SaleStatus.INCOMPLETE,
            })
                .andWhere('sale.payType = :payType', {
                payType: pay_types_enum_1.PayTypes.DEBIT_CARD,
            })
                .select([
                'sale',
                'ticket',
                'locality',
                'event.id',
                'event.name',
                'event.event_date',
                'event.commission',
            ])
                .getMany();
            if (expiredPurchases.length > 0) {
                console.log('Cancelando compras pendientes de pago por tarjeta');
                this.CancelSalesForLotes(expiredPurchases, pay_types_enum_1.PayTypes.DEBIT_CARD);
            }
            return expiredPurchases;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    CancelSalesForLotes(expiredPurchases, payType) {
        expiredPurchases.forEach(async (sale) => {
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
                        total: total,
                    };
                }
            });
            const result = Object.entries(localityTicketInfo).map(([localityName, ticketInfo]) => ({
                localityName,
                ticketCount: ticketInfo.ticketCount,
                price: ticketInfo.price,
                localityId: ticketInfo.localityId,
                total: ticketInfo.total,
            }));
            delete sale.tickets;
            this.deleteSaleAndTickets({ sale, localities: result });
            const logSale = {
                action: `Cancelando compra por ${payType} desde el sistema`,
                data: { sale, localities: result },
            };
            this.logSaleService.create(logSale);
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 */1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesService.prototype, "findPendingPurchasesTransfersAndCancel", null);
__decorate([
    (0, schedule_1.Cron)('0 */30 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesService.prototype, "findPendingPurchasesCardsAndCancel", null);
SalesService = SalesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_service_1.EventService,
        user_service_1.UserService,
        tickets_service_1.TicketsService,
        localities_service_1.LocalitiesService,
        encryption_service_1.EncryptionService,
        log_pay_card_service_1.LogPayCardService,
        mail_service_1.MailService,
        log_sale_service_1.LogSaleService,
        amazon_s3_service_1.AmazonS3Service,
        bills_fff_service_1.BillsFffService])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=sales.service.js.map