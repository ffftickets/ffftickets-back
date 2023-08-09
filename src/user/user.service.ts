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
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.name = this.encryptionService.encryptData(createUserDto.name);
      createUserDto.email = this.encryptionService.encryptData(createUserDto.email);
      createUserDto.identification = this.encryptionService.encryptData(
        createUserDto.identification,
      );
      createUserDto.phone = this.encryptionService.encryptData(createUserDto.phone);
      const newUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(newUser);
      return  this.encryptionService.decryptData(user.email);;
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

      const encryptedUsers = users.map((user) => {
        const encryptedUser: Partial<CreateUserDto> = { ...user };
        encryptedUser.name = this.encryptionService.encryptData(user.name);
        encryptedUser.email = this.encryptionService.encryptData(user.email);
        encryptedUser.identification = this.encryptionService.encryptData(
          user.identification,
        );

        if (user.phone) {
          encryptedUser.phone = this.encryptionService.encryptData(user.phone);
        }
        if (user.address) {
          encryptedUser.address = this.encryptionService.encryptData(
            user.address,
          );
        }

        return encryptedUser;
      });

      const newUsers = this.userRepository.create(encryptedUsers);
      const savedUsers = await this.userRepository.save(newUsers);

      return true;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [data, totalCount] = await this.userRepository.findAndCount({
        skip,
        take: limit,
      });
  
      const decryptedData = data.map((user) => {
        if (user.address) {
          user.address = this.encryptionService.decryptData(user.address);
        }
        if (user.phone) {
          user.phone = this.encryptionService.decryptData(user.phone);
        }
        user.email = this.encryptionService.decryptData(user.email);
        user.name = this.encryptionService.decryptData(user.name);
        user.identification = this.encryptionService.decryptData(user.identification);
  
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
  
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        users: decryptedData,
        currentPage: page,
        pageSize: limit,
        totalPages,
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  

  async findOne(data: FindUserDto) {
    try {
      
      if(data.email) data.email = this.encryptionService.encryptData(data.email);
      if(data.identification) data.email = this.encryptionService.encryptData(data.identification);
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(data)
        .addSelect('user.password')
        .getOne();
      
      if (!user) throw new NotFoundException('No se encontró al usuario');

      if (user.address)
        user.address = this.encryptionService.decryptData(user.address);

      if (user.phone)
        user.phone = this.encryptionService.decryptData(user.phone);

      user.email = this.encryptionService.decryptData(user.email);
   
      user.name = this.encryptionService.decryptData(user.name);
      user.identification = this.encryptionService.decryptData(
        user.identification,
      );

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
      if (user.address)
        user.address = this.encryptionService.decryptData(user.address);
      if (user.phone)
        user.phone = this.encryptionService.decryptData(user.phone);
      user.email = this.encryptionService.decryptData(user.email);
      user.name = this.encryptionService.decryptData(user.name);
      user.identification = this.encryptionService.decryptData(
        user.identification,
      );

      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne({ id });

      if(updateUserDto.address)  user.address = this.encryptionService.encryptData(updateUserDto.address);
      user.city = updateUserDto.city;
      if(updateUserDto.phone)  user.phone = this.encryptionService.encryptData(updateUserDto.phone);
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
