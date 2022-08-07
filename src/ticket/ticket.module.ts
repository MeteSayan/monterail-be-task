import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { Ticket } from './entity/ticket.entity';
import { Event } from 'src/event/entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
