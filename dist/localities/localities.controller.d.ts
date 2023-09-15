import { Logger } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Response } from 'express';
import { EventService } from 'src/event/event.service';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
export declare class LocalitiesController {
    private readonly localitiesService;
    private readonly amazonS3Service;
    private readonly eventService;
    constructor(localitiesService: LocalitiesService, amazonS3Service: AmazonS3Service, eventService: EventService);
    logger: Logger;
    create(createLocalityDto: CreateLocalityDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getLocalitiesByEvent(event: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateLocalityDto: UpdateLocalityDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
