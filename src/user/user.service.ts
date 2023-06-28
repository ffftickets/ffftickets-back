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
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';

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
      handleDbError(error);
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
        },
      ];
      const newUsers = this.userRepository.create(users);
      const user = await this.userRepository.save(newUsers);

      return true;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findOne(data: FindUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.isActive = :isActive', { isActive: true })
        .andWhere(data)
        .addSelect('user.password')
        .getOne();

      if (!user) throw new NotFoundException('No se encontró al usuario');

      return user;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
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
      return user;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.update(id, { isActive: false });
      return user;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async blockUser(id: number) {
    try {
      return await this.userRepository.update(id, {
        status: UserStatus.BLOCKED,
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async unblockUser(id: number) {
    try {
      await this.updateLastLogin(id);
      return await this.userRepository.update(id, {
        status: UserStatus.ACTIVE,
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
  async updateLastLogin(id: number) {
    try {
      return await this.userRepository.update(id, {
        lastLogin: () => 'CURRENT_TIMESTAMP',
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
}
