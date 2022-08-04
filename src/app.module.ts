import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './event/event.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/entity/user.entity';
import { Event } from './event/entity/event.entity';
import { Order } from './order/entity/order.entity';
import { Ticket } from './ticket/entity/ticket.entity';

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
  entities: [User, Event, Order, Ticket],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  keepConnectionAlive: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    AuthModule,
    TicketModule,
    OrderModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
