
export class GenerateOrderDto {
    email: string;
    event: string;
    subtotal: number;
    serviceValue: number;
    total: number;
    order:number;
    localities: localities[];
  }
  class localities{
      name:string;
      price:number;
      quantity:number;
  }
  