import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT } from './config/config.env';
import { initSwagger } from './app.swagger';
import { MulterModule } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';
async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  //tamaño de json
  app.use(json({ limit: '150mb' }));
  app.use(urlencoded({ extended: true, limit: '150mb' }));
  //Cors
  app.enableCors();
  //Prefijo Global de la api
  app.setGlobalPrefix('api');
  //
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const config = app.get(ConfigService);
  const port = config.get(PORT);
  initSwagger(app);
  await app.listen(port);
  logger.log(`App running in ${await app.getUrl()}/api`);
  logger.log(await `Swagger running in http://localhost:${port}/docs`);
}
bootstrap();
