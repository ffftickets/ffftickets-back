import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    private readonly userService: UserService,
  ) {}
  logger = new Logger(LicenseService.name);

  async create(createLicenseDto: CreateLicenseDto) {
    const user = await this.userService.findOne({ id: createLicenseDto.user });
    const userAdmin = await this.userService.findOne({
      id: createLicenseDto.userAdmin,
    });
    this.logger.log('Licencia para: ', user.email);
    createLicenseDto.user = user;
    createLicenseDto.userAdmin = userAdmin;
    const newLicense = this.licenseRepository.create(createLicenseDto);
    const license = await this.licenseRepository.save(newLicense);
    delete license.user.password;
    return license;
  }

  async findAll() {
    const licenses = await this.licenseRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
      .leftJoinAndSelect(
        'license.userAdmin',
        'userAdmin',
        'license.userAdminId = userAdmin.id',
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
        'userAdmin.id',
        'userAdmin.email',
        'userAdmin.name',
        'userAdmin.phone',
        'userAdmin.identification',
        'userAdmin.province',
        'userAdmin.city',
        'userAdmin.address',
        'userAdmin.status',
        'userAdmin.gender',
      ])
      .getMany();

    if (licenses.length === 0)
      throw new NotFoundException('No se encontraron licencias');

    return await licenses;
  }

  async findOne(id: number) {
    const license = await this.licenseRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.user', 'user', 'license.userId = user.id')
      .leftJoinAndSelect(
        'license.userAdmin',
        'userAdmin',
        'license.userAdminId = userAdmin.id',
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
        'userAdmin.id',
        'userAdmin.email',
        'userAdmin.name',
        'userAdmin.phone',
        'userAdmin.identification',
        'userAdmin.province',
        'userAdmin.city',
        'userAdmin.address',
        'userAdmin.status',
        'userAdmin.gender',
      ])
      .where('license.id = :id', { id })
      .getOne();

    console.log(license);
    delete license.user.password;
    delete license.userAdmin.password;

    if (!license) throw new NotFoundException('No se encontró la licencia');

    return license;
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return `This action updates a #${id} license`;
  }

  async remove(id: number) {
    return await this.licenseRepository.update(id, {
      isActive: false,
    });
  }
}
