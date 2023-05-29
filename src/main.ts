import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create a Swagger document
  const options = new DocumentBuilder()
    .setTitle('HR Management System')
    .setDescription('Your app description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
