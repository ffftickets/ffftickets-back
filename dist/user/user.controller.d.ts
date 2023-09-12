import { Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { NewPasswordDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    logger: Logger;
    AdminRegistration(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    PublicRegistration(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    UnblockUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    UserSeed(res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, page: number, limit: number, role: string): Promise<Response<any, Record<string, any>>>;
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    recoverPassword(email: string, identification: string, res: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(body: NewPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
