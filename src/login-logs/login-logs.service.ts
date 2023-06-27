import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginLog } from './entities/login-log.entity';
import { CreateLoginLogDto } from './dto';

@Injectable()
export class LoginLogsService {
  logger = new Logger(LoginLogsService.name);

  constructor(
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>,
  ) {}

  async createLoginLog(createLoginLogDto: CreateLoginLogDto) {
    this.logger.log('Creando registro de login');
    return await this.loginLogRepository.save(createLoginLogDto);
  }

  async countBadLoginLogs(email: string) {
    this.logger.log('Contando registros de login fallidos');

    const lastCorrectLogin = await this.loginLogRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('isCorrect = :isCorrect', { isCorrect: true })
      .orderBy('createdAt', 'DESC')
      .getOne();

    if (!lastCorrectLogin) return 0;

    return await this.loginLogRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('isCorrect = :isCorrect', { isCorrect: false })
      .andWhere('createdAt >= :createdAt', { createdAt: lastCorrectLogin.createdAt })
      .getCount();
  }
}
