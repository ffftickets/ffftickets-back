export declare class CreateUserDto {
    email: string;
    password?: string;
    name: string;
    phone: string;
    identification: string;
    province?: string;
    city?: string;
    address?: string;
    photo?: string;
    roles: string[];
    identificationType: string;
    status?: string;
    isActive: boolean;
    terms?: boolean;
    birthdate?: string;
    gender: string;
}
