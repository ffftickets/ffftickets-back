import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto';
import { UserStatus } from 'src/core/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async createSeedUser() {
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
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(data: FindUserDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: true })
      .andWhere(data)
      .addSelect('user.password')
      .getOne();

    if (!user) throw new NotFoundException('No se encontró al usuario');

    return user; 
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ id });

    user.address = updateUserDto.address;
    user.city = updateUserDto.city;
    user.phone = updateUserDto.phone;
    user.province = updateUserDto.province;
    user.password = updateUserDto.password;
    user.status = updateUserDto.status;
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.update(id, { isActive: false });
    return user;
  }
  async blockUser(id: number) {
    return await this.userRepository.update(id, {
      status: UserStatus.BLOCKED,
    });

  }
  async unblockUser(id: number) {
   return await this.userRepository.update(id, {
      status: UserStatus.ACTIVE,
    });
   
  }
}
