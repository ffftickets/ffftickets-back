import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'typeorm';
export declare class License extends BaseEntity {
    id: number;
    start_date: Date;
    end_date: Date;
    institution: string;
    account_type: string;
    account_number: string;
    document: string;
    user: User;
    userAdmin: User;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
