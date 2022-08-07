import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { Ticket } from 'src/ticket/entity/ticket.entity';
import { createEventDto } from './dto/createEvent.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getEvents(user: string, role: string) {
    try {
      return await this.eventRepository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getEvent(user: string, role: string, id: number) {
    try {
      return await this.eventRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createEvent(user: string, role: string, event: createEventDto) {
    try {
      event.createdBy = user;
      if (role == 'admin') {
        for (let x = 0; x < event.seats.length; x++) {
          if (
            event.seats[x].sellingOption == 'even' &&
            event.seats[x].col % 2 != 0
          ) {
            return 'The number of col is not an even number';
          }
        }

        const createdEvent = await this.eventRepository.save(event);
        console.log(createdEvent.id);

        event.seats.forEach((x) => {
          for (let y = 0; y < x.row; y++) {
            for (let z = 0; z < x.col; z++) {
              let ticket = {
                eventId: createdEvent.id,
                row: y,
                column: z,
                sellingOption: x.sellingOption,
                price: x.price,
              };

              this.ticketRepository.save(ticket);
            }
          }
        });

        return true;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateEvent(user: string, role: string, eventPayload: Event) {
    try {
      if (role == 'admin') {
        const event = await this.eventRepository.findOneBy({
          id: eventPayload.id,
        });
        if (!event) {
          return null;
        }
        return await this.eventRepository.save(eventPayload);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteEvent(user: string, role: string, eventPayload: Event) {
    try {
      //! will be delete tickets too (must be updated)
      if (role == 'admin') {
        const event = await this.eventRepository.findOneBy({
          id: eventPayload.id,
        });
        if (!event) {
          return null;
        }
        return await this.eventRepository.remove(eventPayload);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
