import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { customError } from 'src/common/helpers/custom-error.helper';
import { UserStatus } from 'src/core/enums';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  logger = new Logger(AuthService.name);

  login(user: User) {
    try {
      const { id, ...rest } = user;
      const payload = { sub: id };
      this.userService.updateLastLogin(+id);
      delete user.password;
      return {
        user,
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
   
  }
}
