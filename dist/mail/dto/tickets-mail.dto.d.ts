export interface TicketsEmailDto {
    email: string;
    name: string;
    event: Event;
    sale: Sale;
    localities: any[];
}
interface Sale {
    id: number;
}
interface Event {
    name: string;
    event_date: string | any;
    place: string;
    user: User;
    poster: string;
}
interface User {
    name: string;
}
export {};
