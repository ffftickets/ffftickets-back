import { Logger } from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';
export declare class LicenseController {
    private readonly licenseService;
    constructor(licenseService: LicenseService);
    logger: Logger;
    create(createLicenseDto: CreateLicenseDto, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateLicenseDto: UpdateLicenseDto, res: Response): Response<any, Record<string, any>>;
    remove(id: string, res: Response): Response<any, Record<string, any>>;
}
