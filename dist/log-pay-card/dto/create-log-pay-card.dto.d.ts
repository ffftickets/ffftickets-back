import { IpDetail, UserAgentDto } from 'src/login-logs/dto';
export declare class CreateLogPayCardDto {
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
    authorizationNumber?: string;
    tipoPago: string;
    ipDetail?: IpDetail;
    userAgent?: UserAgentDto;
    sale: any;
}
