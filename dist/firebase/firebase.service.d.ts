import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadBase64ImageDto } from './dto';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
export declare class FirebaseService {
    private readonly configService;
    private readonly s3;
    private firebaseConfig;
    firebaseApp: any;
    storageBucket: string;
    logger: Logger;
    constructor(configService: ConfigService, s3: AmazonS3Service);
    uploadBase64(body: UploadBase64ImageDto): Promise<{
        imageUrl: string;
    }>;
    deleteImageByUrl(imageUrl: string): Promise<boolean>;
}
