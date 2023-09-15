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
import { Like, Repository } from 'typeorm';
import { FindUserDto, NewPasswordDto } from './dto';
import { UserStatus } from 'src/core/enums';
import { customError } from 'src/common/helpers/custom-error.helper';
import { IdentificationType } from './emun/identification-type.enum';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EventService } from 'src/event/event.service';
import { MailService } from 'src/mail/mail.service';
import e from 'express';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
 
  
 
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
    private readonly eventService: EventService,
    private readonly mailService:MailService
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(
        await this.encryptUser(createUserDto),
      );
      const user = await this.userRepository.save(newUser);
      this.mailService.registerEmail({
        email: createUserDto.email,
        name: createUserDto.name,
      });
      return this.encryptionService.decryptData(user.email);
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
          phone: '099952397',
          identification: '23006817510',
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

      const encryptedUsers = await this.encryptUsersList(users);

      const newUsers = this.userRepository.create(encryptedUsers);
      const savedUsers = await this.userRepository.save(newUsers);

      return true;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async encryptUser(user: CreateUserDto): Promise<Partial<CreateUserDto>> {
    const encryptedUser: Partial<CreateUserDto> = { ...user };
    encryptedUser.name = await this.encryptionService.encryptData(user.name);
    encryptedUser.email = await this.encryptionService.encryptData(user.email);
    encryptedUser.identification = await this.encryptionService.encryptData(
      user.identification,
    );

    if (user.phone) {
      encryptedUser.phone = await this.encryptionService.encryptData(
        user.phone,
      );
    }
    if (user.address) {
      encryptedUser.address = await this.encryptionService.encryptData(
        user.address,
      );
    }

    return encryptedUser;
  }

  async encryptUsersList(
    users: CreateUserDto[],
  ): Promise<Partial<CreateUserDto>[]> {
    const encryptedUsers: Partial<CreateUserDto>[] = [];
    for (const user of users) {
      const encryptedUser = await this.encryptUser(user);
      encryptedUsers.push(encryptedUser);
    }
    return encryptedUsers;
  }

  async findAll(page: number = 1, limit: number = 10, role?: string) {
    try {
      const skip = (page - 1) * limit;

      let whereClause = {}; // Condición de filtro inicial (sin filtro de rol)
      if (role) {
        whereClause = {
          roles: Like(`%${role}%`), // Utilizamos el operador Like para buscar en el array
        };
      }

      const [data, totalCount] = await this.userRepository.findAndCount({
        skip,
        take: limit,
        where: whereClause, // Usar la condición de filtro adecuada
      });
      if (totalCount === 0)
        throw new NotFoundException('No se encontraron usuarios');
      const decryptedData = await Promise.all(
        data.map(async (user: any) => {
          if (user.address) {
            user.address = this.encryptionService.decryptData(user.address);
          }
          if (user.phone) {
            user.phone = this.encryptionService.decryptData(user.phone);
          }
          user.email = this.encryptionService.decryptData(user.email);
          user.name = this.encryptionService.decryptData(user.name);
          user.identification = this.encryptionService.decryptData(
            user.identification,
          );

          if (role === 'ORGANIZER') {
            const eventCount = await this.eventService.countEventsForUser(
              user.id,
            );
            user.eventCount = eventCount;
          }

          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }),
      );
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
      if (data.email)
        data.email = this.encryptionService.encryptData(data.email);
      if (data.identification)
        data.email = this.encryptionService.encryptData(data.identification);
      console.log(data)
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

      if (updateUserDto.address)
        user.address = this.encryptionService.encryptData(
          updateUserDto.address,
        );
      user.city = updateUserDto.city;
      if (updateUserDto.phone)
        user.phone = this.encryptionService.encryptData(updateUserDto.phone);
      user.province = updateUserDto.province;
      user.password = updateUserDto.password;
      user.status = updateUserDto.status;
      if(updateUserDto.roles) user.roles = updateUserDto.roles;
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  updateRol(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = this.userRepository.update(id, {
        roles: updateUserDto.roles,
      });
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
  async recoverPassword(email: string, identification: string) {
    try {
      email = this.encryptionService.encryptData(email);
      identification = this.encryptionService.encryptData(identification);
      const data :any = await this.userRepository.findOne({where:{email,identification}});
      if(!data) throw new ConflictException('Los datos ingresados no coinciden');
      const min = 8;
      const max = 14;
      const lengthPassword = Math.floor(Math.random() * (max - min + 1)) + min;
      const newPassword = this.generateAlphanumericPassword(lengthPassword);
      data.password = newPassword;
      const dataUpdate =  await this.userRepository.save(data);
      this.mailService.newPasswordEmail({email:this.encryptionService.decryptData(email),newPassword})
      return {message:'Se ha enviado un correo con la nueva contraseña'};
    } catch (error) {
      this.logger.error(error);
      customError(error);
      
    }
  }
  generateAlphanumericPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }
  async changePassword(body: NewPasswordDto) {
    try {
      let { email, oldPassword, newPassword } = body;
      this.logger.log('Cambiando contraseña: ', email);
      email = this.encryptionService.encryptData(email);
      const user:any = await this.userRepository.findOne({ where: { email } });
      
      if (!user) throw new NotFoundException('No se encontró al usuario');
      if(!await bcrypt.compare(oldPassword, user.password)) throw new ConflictException('La contraseña actual no coincide');
        
      user.password = newPassword;
      await this.userRepository.save(user);
      this.mailService.passwordChangedEmail(this.encryptionService.decryptData(email));
      return {message:'Se ha cambiado la contraseña'};
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }	
  }

}
