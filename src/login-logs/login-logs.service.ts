import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose'; // Importamos Model de mongoose
import { InjectModel } from '@nestjs/mongoose'; // Importamos InjectModel de @nestjs/mongoose

import { CreateLoginLogDto } from './dto';
import { customError } from 'src/common/helpers/custom-error.helper';
import { UserService } from 'src/user/user.service';
import { LoginLog } from './entities/login-log.entity';

@Injectable()
export class LoginLogsService {
  logger = new Logger(LoginLogsService.name);

  constructor(
    @InjectModel('LoginLog') // Inyectamos el modelo de MongoDB
    private readonly loginLogModel: Model<LoginLog>,
    private readonly userService: UserService,
  ) {}

  async createLoginLog(createLoginLogDto: CreateLoginLogDto) {
    try {
      this.logger.log('Creando registro de login');
      const createdLog = new this.loginLogModel(createLoginLogDto); // Creamos una instancia del modelo
      return await createdLog.save(); // Guardamos el registro en MongoDB
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async countBadLoginLogs(email: string, lastLogin: Date) {
    try {
      const updatedAt = (await this.userService.findOne({ email })).updatedAt;

      return await this.loginLogModel
        .countDocuments({
          email,
          isCorrect: false,
          createdAt: { $gte: lastLogin },
        })
        .exec();
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
