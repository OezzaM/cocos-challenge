import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerManager } from './integrations/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  SwaggerManager.initialize(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.SV_PORT ?? 3000);
}
bootstrap();
