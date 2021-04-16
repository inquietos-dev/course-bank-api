import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      max: 100,
      windowsMs: 15 * 60 * 1000,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
