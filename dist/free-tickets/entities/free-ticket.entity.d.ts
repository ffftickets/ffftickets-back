import { Localities } from 'src/localities/entities/localities.entity';
import { User } from 'src/user/entities/user.entity';
export declare class FreeTicket {
    id: number;
    locality: Localities;
    user: User;
    status: string;
    qr: string;
    createdAt: Date;
    updatedAt: Date;
}
