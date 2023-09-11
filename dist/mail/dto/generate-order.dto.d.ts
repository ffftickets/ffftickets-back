export declare class GenerateOrderDto {
    email: string;
    event: string;
    subtotal: number;
    serviceValue: number;
    total: number;
    order: number;
    localities: localities[];
}
declare class localities {
    name: string;
    price: number;
    quantity: number;
}
export {};
