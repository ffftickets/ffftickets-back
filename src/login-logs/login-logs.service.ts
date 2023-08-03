import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { LoginLog } from './entities/login-log.entity';
import { CreateLoginLogDto } from './dto';
import { customError } from 'src/common/helpers/custom-error.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginLogsService {
  logger = new Logger(LoginLogsService.name);

  constructor(
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>,
    private readonly userService: UserService,
  ) {}

  async createLoginLog(createLoginLogDto: CreateLoginLogDto) {
    try {
      this.logger.log('Creando registro de login');
      return await this.loginLogRepository.save(createLoginLogDto);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async countBadLoginLogs(email: string, lastLogin: Date) {
    try {
      const updatedAt = (await this.userService.findOne({ email })).updatedAt;

      return await this.loginLogRepository
        .createQueryBuilder('loginLog')
        .where('loginLog.email = :email', { email })
        .andWhere('loginLog.isCorrect = false')
        .andWhere('loginLog.createdAt >= :lastLogin', { lastLogin })
        .getCount();
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
