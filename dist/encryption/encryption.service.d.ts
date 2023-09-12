import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private readonly config;
    logger: Logger;
    key: any;
    iv: any;
    private readonly secretKey;
    private readonly secretIv;
    constructor(config: ConfigService);
    encryptData(data: string): string;
    decryptData(encryptedData: string): string;
}
