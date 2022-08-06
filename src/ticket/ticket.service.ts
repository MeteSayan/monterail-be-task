import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { ticketDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTickets(user: string, role: string) {
    try {
      return await this.ticketRepository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTicket(user: string, role: string, id: string) {
    try {
      if (role == 'admin') {
        return await this.ticketRepository.findOneBy({ id: id });
      } else {
        return await this.ticketRepository.findOneBy({
          id: id,
          username: user,
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateTicket(user: string, role: string, ticketPayload: ticketDto) {
    try {
      const ticket = await this.ticketRepository.findOneBy({
        id: ticketPayload.id,
        username: user,
      });
      if (!ticket) {
        return null;
      }
      return await this.ticketRepository.save(ticketPayload);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
