import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfigType } from 'config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ServerConfigType, true>);
  const port = configService.get('port', { infer: true });
  await app.listen(port);
}
bootstrap();
