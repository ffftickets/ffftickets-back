import { Injectable, Logger } from '@nestjs/common';
import { CreateEncryptionDto } from './dto/create-encryption.dto';
import { UpdateEncryptionDto } from './dto/update-encryption.dto';
import * as crypto from 'crypto';
import { ENCRYPTION_METHOD, SECRET_IV, SECRET_KEY } from 'src/config/config.env';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EncryptionService {
  logger = new Logger(EncryptionService.name);

  key=this.config.get(SECRET_KEY)
  iv= this.config.get(SECRET_IV)


  private readonly secretKey = Buffer.from(this.key, 'hex');
  private readonly secretIv = Buffer.from(this.iv, 'hex'); 
  constructor(private readonly config: ConfigService) {}

  encryptData(data: string): string {
    const cipher = crypto.createCipheriv(this.config.get(ENCRYPTION_METHOD), Buffer.from(this.secretKey), this.secretIv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');

    return encryptedData;
  }

  decryptData(encryptedData: string): string {
    const decipher = crypto.createDecipheriv(this.config.get(ENCRYPTION_METHOD), Buffer.from(this.secretKey), this.secretIv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }
}
