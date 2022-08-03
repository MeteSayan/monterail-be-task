import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as config from 'config';

const username = config.get('dbConfig.dbUser') as string;
const password = config.get('dbConfig.dbPass') as string;
const dbName = config.get('dbConfig.dbName') as string;
const dbHost = config.get('dbConfig.dbHost') as string;

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbHost,
  port: 5432,
  username: username,
  password: password,
  database: dbName,
  entities: [],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  keepConnectionAlive: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
