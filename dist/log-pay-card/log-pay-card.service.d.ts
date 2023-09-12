import { Logger } from '@nestjs/common';
import { CreateLogPayCardDto } from './dto/create-log-pay-card.dto';
import { CreateLogPayCard } from './entities/log-pay-card.entity';
import { Repository } from 'typeorm';
export declare class LogPayCardService {
    private readonly logPayCardRepository;
    logger: Logger;
    constructor(logPayCardRepository: Repository<CreateLogPayCard>);
    create(createLogPayCardDto: CreateLogPayCardDto): Promise<CreateLogPayCardDto & CreateLogPayCard>;
}
