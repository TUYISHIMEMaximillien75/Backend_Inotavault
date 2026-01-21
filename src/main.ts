import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
  .setTitle(SwaggerConfig.title)
  .setDescription(SwaggerConfig.description)
  .setVersion(SwaggerConfig.version)
  .addSecurity('JWT-auth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, documentFactory,{
    swaggerOptions: {
      persistAuthorization: true,
    }
  })

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
