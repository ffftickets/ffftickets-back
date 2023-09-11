export class OrderCompletedDto {
    order: number;
    email: string;
    event: string;
    subtotal: number;
    serviceValue: number;
    total: number;
    localities: LocalityDto[];
    customer:CustomerDto;
    pay:Pay;
}
class LocalityDto {
    name: string;
    price: number;
    quantity: number;
}
class CustomerDto{
    name:string;
    phone:string;
    ci:string;
    address:string;
}
class Pay{
    name:string;
    number?:string;
    
}