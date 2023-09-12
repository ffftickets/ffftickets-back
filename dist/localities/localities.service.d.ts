import { Logger } from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Localities } from './entities/localities.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class LocalitiesService {
    private readonly localitiesRepository;
    private readonly eventService;
    private readonly firebaseService;
    logger: Logger;
    constructor(localitiesRepository: Repository<Localities>, eventService: EventService, firebaseService: FirebaseService);
    create(createLocalityDto: CreateLocalityDto): Promise<Localities>;
    findAll(): Promise<Localities[]>;
    findOne(id: number): Promise<Localities>;
    getLocalitiesByEvent(id: number): Promise<Localities[]>;
    update(id: number, updateLocalityDto: UpdateLocalityDto): Promise<Localities>;
    updateSold(id: number, sold: number): Promise<any>;
    remove(id: number): Promise<Localities>;
    verifyExist(id: number, name: string): Promise<any>;
}
