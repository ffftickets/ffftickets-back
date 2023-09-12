import { Logger } from '@nestjs/common';
import { CreateLogSaleDto } from './dto/create-log-sale.dto';
import { Repository } from 'typeorm';
import { LogSale } from './entities/log-sale.entity';
export declare class LogSaleService {
    private readonly logSaleRepository;
    logger: Logger;
    constructor(logSaleRepository: Repository<LogSale>);
    create(createLogSaleDto: CreateLogSaleDto): Promise<LogSale>;
}
