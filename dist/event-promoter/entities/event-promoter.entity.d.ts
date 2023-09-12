import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
export declare class EventPromoter {
    id: number;
    event: Event;
    promoter: User;
    code: string;
    isActive: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
