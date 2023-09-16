import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBillsFffDto } from './dto/create-bills_fff.dto';
import { UpdateBillsFffDto } from './dto/update-bills_fff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillsFff } from './entities/bills_fff.entity';
import { Repository } from 'typeorm';
import { customError } from 'src/common/helpers/custom-error.helper';
import { StatusBill } from './enums/status-bill.dto';

@Injectable()
export class BillsFffService {
  logger = new Logger(BillsFffService.name);
  constructor( @InjectRepository(BillsFff)
  private readonly billRepository: Repository<BillsFff>,){

  }
  create(createBillsFffDto: CreateBillsFffDto) {
    try {
      this.logger.log('creando factura');
      const data = this.billRepository.create(createBillsFffDto);
      return this.billRepository.save(data);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }
    
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
   
  ) {
    try {
      const skip = (page - 1) * limit;
  
      const query = this.billRepository
        .createQueryBuilder('bill')
        .innerJoin('bill.sale', 'sale')
        .select([
          'bill',
          'sale',
         
        ])
        .orderBy('bill.updatedAt', 'DESC')
  
      const [bills, totalCount] = await query
        .skip(skip)
        .take(limit)
        .getManyAndCount();
  
      if (totalCount === 0) {
        throw new NotFoundException('No se encuentran facturas');
      }
  
    
  
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        bills: bills,
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
  

  findOne(id: number) {
    return `This action returns a #${id} billsFff`;
  }

  async update(sale: number, status: StatusBill) {
   
    try {
      const data = await this.billRepository
      .createQueryBuilder('bill')
      .where(`bill.sale = :sale`, { sale })
      .getOne();
   
      data.status = status;

      return this.billRepository.save(data);
    } catch (error) {
      this.logger.error(error);
      customError(error);
    }

  }

  remove(id: number) {
    return `This action removes a #${id} billsFff`;
  }
}
