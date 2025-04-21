import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerManager {
  static initialize(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Cocos Challenge')
      .setDescription('The Cocos challenge API')
      .setVersion('1.0')
      .addTag('Cocos Challenge')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document, {
      swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha' },
    });
  }
}
