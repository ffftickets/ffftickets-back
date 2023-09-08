import { Logger } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { License } from './entities/license.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
export declare class LicenseService {
    private readonly licenseRepository;
    private readonly userService;
    constructor(licenseRepository: Repository<License>, userService: UserService);
    logger: Logger;
    create(createLicenseDto: CreateLicenseDto): Promise<License>;
    findAll(): Promise<License[]>;
    findOne(id: number): Promise<License>;
    update(id: number, updateLicenseDto: UpdateLicenseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<License>;
}
