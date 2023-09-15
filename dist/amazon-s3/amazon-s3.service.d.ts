import { ConfigService } from '@nestjs/config';
import { UploadBase64ImageDto } from './dto/upload-base64-image.dto';
export declare class AmazonS3Service {
    private readonly configService;
    private s3;
    private bucketName;
    private logger;
    constructor(configService: ConfigService);
    uploadBase64(body: UploadBase64ImageDto): Promise<{
        imageUrl: string;
    }>;
    deleteImageByUrl(imageUrl: string): Promise<boolean>;
}
