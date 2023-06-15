import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Create a Swagger document
  const options = new DocumentBuilder()
    .setTitle('Feature Extraction System')
    .setDescription('Enables extracting features from widely used file formats')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
