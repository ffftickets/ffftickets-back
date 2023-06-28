import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { handleDbError } from 'src/common/helpers/db-error-handler.helper';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    private readonly userService: UserService,
  ) {}
  logger = new Logger(LicenseService.name);

  async create(createLicenseDto: CreateLicenseDto) {
    try {
      const user = await this.userService.findOne({
        id: createLicenseDto.user,
      });
      const user_admin = await this.userService.findOne({
        id: createLicenseDto.user_admin,
      });
      this.logger.log('Licencia para: ', user.email);
      createLicenseDto.user = user;
      createLicenseDto.user_admin = user_admin;
      const newLicense = this.licenseRepository.create(createLicenseDto);
      const license = await this.licenseRepository.save(newLicense);
      delete license.user.password;
      return license;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findAll() {
    try {
      const licenses = await this.licenseRepository
        .createQueryBuilder('license')
        .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
        .leftJoinAndSelect(
          'license.user_admin',
          'user_admin',
          'license.user_adminId = user_admin.id',
        )
        .select([
          'license',
          'user.id',
          'user.email',
          'user.name',
          'user.phone',
          'user.identification',
          'user.province',
          'user.city',
          'user.address',
          'user.status',
          'user.gender',
          'user_admin.id',
          'user_admin.email',
          'user_admin.name',
          'user_admin.phone',
          'user_admin.identification',
          'user_admin.province',
          'user_admin.city',
          'user_admin.address',
          'user_admin.status',
          'user_admin.gender',
        ])
        .getMany();

      if (licenses.length === 0)
        throw new NotFoundException('No se encontraron licencias');

      return licenses;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async findOne(id: number) {
    try {
      const license = await this.licenseRepository
        .createQueryBuilder('license')
        .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
        .leftJoinAndSelect(
          'license.user_admin',
          'user_admin',
          'license.user_adminId = user_admin.id',
        )
        .select([
          'license',
          'user.id',
          'user.email',
          'user.name',
          'user.phone',
          'user.identification',
          'user.province',
          'user.city',
          'user.address',
          'user.status',
          'user.gender',
          'user_admin.id',
          'user_admin.email',
          'user_admin.name',
          'user_admin.phone',
          'user_admin.identification',
          'user_admin.province',
          'user_admin.city',
          'user_admin.address',
          'user_admin.status',
          'user_admin.gender',
        ])
        .where('license.id = :id', { id })
        .getOne();

      console.log(license);
      delete license.user.password;
      delete license.user_admin.password;

      if (!license) throw new NotFoundException('No se encontró la licencia');

      return license;
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async update(id: number, updateLicenseDto: UpdateLicenseDto) {
    try {
      return await this.licenseRepository.update(id, { ...updateLicenseDto });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.licenseRepository.update(id, {
        isActive: false,
      });
    } catch (error) {
      this.logger.error(error);
      handleDbError(error);
    }
  }
}
