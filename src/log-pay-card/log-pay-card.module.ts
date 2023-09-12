import { Module } from '@nestjs/common';
import { LogPayCardService } from './log-pay-card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateLogPayCardSchema } from './entities/log-pay-card.entity';
// Importa el nuevo modelo y esquema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CreateLogPayCard', schema: CreateLogPayCardSchema }]), // Configura el modelo y el esquema de MongoDB
  ],
  providers: [LogPayCardService],
  exports: [LogPayCardService],
})
export class LogPayCardModule {}
