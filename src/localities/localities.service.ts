import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { customError } from 'src/common/helpers/custom-error.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Localities } from './entities/localities.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadBase64ImageDto } from 'src/firebase/dto';

@Injectable()
export class LocalitiesService {
  logger = new Logger(LocalitiesService.name);
  constructor(
    @InjectRepository(Localities)
    private readonly localitiesRepository: Repository<Localities>,
    private readonly eventService: EventService,
    private readonly firebaseService: FirebaseService,
  ) {}
  async create(createLocalityDto: CreateLocalityDto) {
    try {
      const data = await this.localitiesRepository.create(createLocalityDto);
      const locality = await this.localitiesRepository.save(data);
      return locality;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findAll() {
    try {
      const localities = await this.localitiesRepository
        .createQueryBuilder('locality')
        .innerJoin('locality.event', 'event')
        .select(['locality', 'event'])
        .getMany();
      if (!localities || localities.length === 0)
        throw new NotFoundException('No se encontraron localidades');
      return localities;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async findOne(id: number) {
    try {
      const locality = await this.localitiesRepository
        .createQueryBuilder('locality')
        .innerJoin('locality.event', 'event')
        .select(['locality', 'event'])
        .where('locality.id=:id', { id })
        .getOne();
      if (!locality) throw new NotFoundException('No se encontró la localidad');
      return locality;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
  async getLocalitiesByEvent(id: number) {
    try {
      const localities = await this.localitiesRepository
        .createQueryBuilder('locality')
        .innerJoin('locality.event', 'event')
        .select(['locality'])
        .where('locality.event=:id', { id })
        .getMany();
      if (!localities || localities.length === 0)
        throw new NotFoundException('No se encontraron localidades');
      return localities;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async update(id: number, updateLocalityDto: UpdateLocalityDto) {
    try {
      await this.localitiesRepository.update(id, {
        ...updateLocalityDto,
      });
      const data = await this.findOne(id);
      return data;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async updateSold(id: number, sold: number) {
    try {
      console.log(id,sold)
      this.logger.log('Actualizando venta: ' + id)
      await this.localitiesRepository.update(id, {
        sold: sold,
      });

      return null;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.localitiesRepository.update(id, { isActive: false });
      const data = await this.findOne(id);
      return data;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }

  async verifyExist(id: number, name: string) {
    try {
      const locality = await this.localitiesRepository
        .createQueryBuilder('locality')
        .innerJoin('locality.event', 'event')
        .select(['locality', 'event'])
        .where('locality.name=:name', { name })
        .andWhere('event.id=:id', { id })
        .getOne();
      console.log(locality);
      if (locality)
        throw new ConflictException('El nombre de la localidad ya existe');
      return null;
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
  }
}
