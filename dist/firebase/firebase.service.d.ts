import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadBase64ImageDto } from './dto';
export declare class FirebaseService {
    private readonly configService;
    private firebaseConfig;
    firebaseApp: any;
    storageBucket: string;
    logger: Logger;
    constructor(configService: ConfigService);
    uploadBase64(body: UploadBase64ImageDto): Promise<{
        imageUrl: string;
    }>;
    deleteImageByUrl(imageUrl: string): Promise<boolean>;
}
