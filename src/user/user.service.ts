import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto';
import { UserStatus } from 'src/core/enums';
import { customError } from 'src/common/helpers/custom-error.helper';
import { IdentificationType } from './emun/identification-type.enum';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(newUser);
      delete user.password;
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async createSeedUser() {
    try {
      const users: CreateUserDto[] = [
        {
          email: 'avillegas7510@gmail.com',
          password: '12345678',
          name: 'Alex Villegas',
          phone: '0999952397',
          identification: '2300687510',
          province: 'Tungurahua',
          city: 'Ambato',
          address: 'Ambato',
          roles: ['ADMIN'],
          status: 'ACTIVE',
          isActive: true,
          birthdate: '2023-05-28T02:31:07.313Z',
          gender: 'MASCULINO',
          terms: true,
          identificationType: IdentificationType.CEDULA,
          photo: 'http',
        },
      ];
      const newUsers = this.userRepository.create(users);
      const user = await this.userRepository.save(newUsers);

      return true;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll() {
    try {
      const data = await this.userRepository.find();
      const dataWithoutPasswords = data.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return dataWithoutPasswords;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOne(data: FindUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(data)
        .addSelect('user.password')
        .getOne();

      if (!user) throw new NotFoundException('No se encontró al usuario');
      delete user.password;
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async findUserByLogin(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) throw new NotFoundException('No se encontró al usuario');
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne({ id });

      user.address = updateUserDto.address;
      user.city = updateUserDto.city;
      user.phone = updateUserDto.phone;
      user.province = updateUserDto.province;
      user.password = updateUserDto.password;
      user.status = updateUserDto.status;
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.update(id, { isActive: false });
      const user = await this.findOne({ id });
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async blockUser(id: number) {
    try {
      return await this.userRepository.update(id, {
        status: UserStatus.BLOCKED,
      });
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async unblockUser(id: number) {
    try {
      /* await this.updateLastLogin(id); */
      const user = await this.findOne({ id });

      const data = await this.userRepository.update(id, {
        status: UserStatus.ACTIVE,
      });

      user.status = UserStatus.ACTIVE;
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async updateLastLogin(id: number) {
    try {
      return await this.userRepository.update(id, {
        lastLogin: () => 'CURRENT_TIMESTAMP',
      });
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
