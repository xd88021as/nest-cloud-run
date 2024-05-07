import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
      'locale',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
  });

  const port = process.env.PORT || 8080;
  const address = process.env.ADDRESS || '0.0.0.0';
  await app.listen(port, address);
}
bootstrap();
