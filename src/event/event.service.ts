import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { Ticket } from 'src/ticket/entity/ticket.entity';
import { createEventDto } from './dto/createEvent.dto';
import { eventDto } from './dto/event.dto';

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

  async getEvent(user: string, role: string, id: string) {
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
        return await this.eventRepository.save(event);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateEvent(user: string, role: string, eventPayload: eventDto) {
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

  async deleteEvent(user: string, role: string, eventPayload: eventDto) {
    try {
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
