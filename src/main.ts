import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './utils/unauthorized-exception.filter';
import { Handler, Context, Callback } from 'aws-lambda';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API for managing orders')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(3000);
}
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

bootstrap();
