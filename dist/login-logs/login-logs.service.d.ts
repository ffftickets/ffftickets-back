import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginLog } from './entities/login-log.entity';
import { CreateLoginLogDto } from './dto';
import { UserService } from 'src/user/user.service';
export declare class LoginLogsService {
    private readonly loginLogRepository;
    private readonly userService;
    logger: Logger;
    constructor(loginLogRepository: Repository<LoginLog>, userService: UserService);
    createLoginLog(createLoginLogDto: CreateLoginLogDto): Promise<CreateLoginLogDto & LoginLog>;
    countBadLoginLogs(email: string, lastLogin: Date): Promise<number>;
}
