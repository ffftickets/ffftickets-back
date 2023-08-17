import { NestFactory } from '@nestjs/core';
import { Queue, Worker } from 'bullmq';
import { AppModule } from './app.module'; // Asegúrate de importar tu módulo principal
import { CreateSaleDto } from './sales/dto/create-sale.dto';
import { SalesService } from './sales/sales.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  // Configura el Worker para manejar los trabajos de la cola 'sales'
  const salesQueue = new Queue('sales');
  const worker = new Worker('sales', async job => {
    try {
      const createSaleDto: CreateSaleDto = job.data;
      const salesService = app.get(SalesService);
      await salesService.create(createSaleDto);
    } catch (error) {
      console.error(error);
    }
  });

  console.log('Queue server running');
}
bootstrap();
