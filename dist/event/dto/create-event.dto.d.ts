import { PaymentMethod } from '../emun/payment-method.enum';
export declare class CreateEventDto {
    user: any;
    name: string;
    event_date: Date;
    hour: string;
    city: string;
    province: string;
    address: string;
    geo_location: string;
    poster?: any;
    courtesy_ticket?: string;
    informative_gallery?: any[];
    event_gallery?: any[];
    ruc?: string;
    municipal_authorization?: string;
    issuance_authorization?: string;
    capacity_authorization?: string;
    status: string;
    isActive?: boolean;
    event_type: any;
    past_events?: any[];
    commission?: number;
    payment_methods?: PaymentMethod[];
    iva: boolean;
}
