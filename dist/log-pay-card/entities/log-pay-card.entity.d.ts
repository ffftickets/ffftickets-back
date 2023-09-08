import { Sale } from 'src/sales/entities/sale.entity';
export declare class CreateLogPayCard {
    id: number;
    id_transaccion: string;
    token: string;
    amount: number;
    cardType: string;
    cardIssuer: string;
    cardInfo: string;
    clientID: string;
    clientName: string;
    state: string;
    fecha: string;
    acquirer: string;
    deferred: number;
    interests: string;
    interestValue: number;
    amountWoTaxes: string;
    amountWTaxes: string;
    taxesValue: string;
    amountAuthorized: number;
    authorizationNumber: string;
    tipoPago: string;
    ipDetail: any;
    userAgent: any;
    sale: Sale;
    createdAt: Date;
    updatedAt: Date;
}
