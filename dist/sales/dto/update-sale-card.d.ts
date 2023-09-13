import { CreateLogPayCard } from 'src/log-pay-card/entities/log-pay-card.entity';
export declare class UpdateSaleCard {
    authorizationNumber?: string;
    transactionCode?: string;
    catwalkCommission?: number;
    log: CreateLogPayCard;
    sale?: any;
}
