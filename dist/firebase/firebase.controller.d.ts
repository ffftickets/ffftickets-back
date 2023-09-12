import { Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { DeleteImg, UploadBase64ImageDto } from './dto';
import { Response } from 'express';
export declare class FirebaseController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    logger: Logger;
    uploadBase64(body: UploadBase64ImageDto, res: Response): Promise<{
        imageUrl: string;
    }>;
    deleteImg(body: DeleteImg, res: Response): Promise<Response<any, Record<string, any>>>;
}
