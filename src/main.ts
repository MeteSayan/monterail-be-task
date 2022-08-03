if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config';
import helmet from 'helmet';
import * as compression from 'compression';
import { json, urlencoded } from 'express';

const configName = config.get('configName');
const logger = new Logger('Main');

logger.log('Configuration name: ' + configName);

const port = (config.get('serverConfig.port') as number) || 3200;

const hsts = config.get('serverConfig.hsts');

declare const module: any;

async function bootstrap() {
  const logLevels: LogLevel[] = config.get('logLevels');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logLevels,
  });

  app.startAllMicroservices();

  app.use(helmet({ hsts }));
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({ credentials: true, origin: '*' });

  const apiPath = 'api';

  app.setGlobalPrefix(apiPath);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ticketworld Back-End')
    .setDescription('Ticketworld API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
