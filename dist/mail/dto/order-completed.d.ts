export declare class OrderCompletedDto {
    order: number;
    email: string;
    event: string;
    subtotal: number;
    serviceValue: number;
    total: number;
    localities: LocalityDto[];
    customer: CustomerDto;
    pay: Pay;
}
declare class LocalityDto {
    name: string;
    price: number;
    quantity: number;
}
declare class CustomerDto {
    name: string;
    phone: string;
    ci: string;
    address: string;
}
declare class Pay {
    name: string;
    number?: string;
}
export {};
