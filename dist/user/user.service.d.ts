import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EventService } from 'src/event/event.service';
export declare class UserService {
    private readonly userRepository;
    private readonly encryptionService;
    private readonly eventService;
    logger: Logger;
    constructor(userRepository: Repository<User>, encryptionService: EncryptionService, eventService: EventService);
    create(createUserDto: CreateUserDto): Promise<string>;
    createSeedUser(): Promise<boolean>;
    encryptUser(user: CreateUserDto): Promise<Partial<CreateUserDto>>;
    encryptUsersList(users: CreateUserDto[]): Promise<Partial<CreateUserDto>[]>;
    findAll(page?: number, limit?: number, role?: string): Promise<{
        users: any[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }>;
    findOne(data: FindUserDto): Promise<User>;
    findUserByLogin(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    blockUser(id: number): Promise<import("typeorm").UpdateResult>;
    unblockUser(id: number): Promise<User>;
    updateLastLogin(id: number): Promise<import("typeorm").UpdateResult>;
}
