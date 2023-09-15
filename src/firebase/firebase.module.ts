import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { AmazonS3Module } from 'src/amazon-s3/amazon-s3.module';
@Global()
@Module({
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports:[FirebaseService],
  imports: [AmazonS3Module],
})
export class FirebaseModule {}
