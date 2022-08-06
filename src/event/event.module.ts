import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { Event } from './entity/event.entity';
import { Ticket } from 'src/ticket/entity/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Ticket])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
