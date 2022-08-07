import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { updateTicketDto } from './dto/updateTicket.dto';
import { Event } from 'src/event/entity/event.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async getTickets(user: string, role: string) {
    try {
      return await this.ticketRepository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getReservedTickets(user: string, role: string) {
    let reserverdTickets = {
      seats: [],
      quantity: 0,
      totalCost: 0,
    };

    try {
      if (role == 'admin') {
        const sql = `select to_json(res) as data
        from (
                 select t.*, to_json(e) "eventInfo"
                 from public.ticket t
                          inner join public.event e
                                     ON t.event_id = e.id
                 WHERE t.status = true
             ) res;
        `;
        reserverdTickets.seats = await this.ticketRepository.query(sql);

        //reserverdTickets.eventInfo = reserverdTickets;

        if (reserverdTickets.seats) {
          reserverdTickets.quantity = reserverdTickets.seats.length;
          reserverdTickets.totalCost = reserverdTickets.seats.reduce(
            (accumulator, object) => {
              return accumulator + object.data.price;
            },
            0,
          );

          return reserverdTickets;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getReservedTicketsByEventId(
    user: string,
    role: string,
    eventId: number,
  ) {
    try {
      let reserverdTickets = {
        seats: [],
        eventInfo: {},
        quantity: 0,
        totalCost: 0,
      };

      if (role == 'admin') {
        reserverdTickets.seats = await this.ticketRepository.findBy({
          status: true,
          eventId: eventId,
        });

        const eventInfo = await this.eventRepository.findOneBy({
          id: eventId,
        });

        if (reserverdTickets.seats) {
          reserverdTickets.eventInfo = eventInfo;
          reserverdTickets.quantity = reserverdTickets.seats.length;
          reserverdTickets.totalCost = reserverdTickets.seats.reduce(
            (accumulator, object) => {
              return accumulator + object.price;
            },
            0,
          );

          return reserverdTickets;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTicket(user: string, role: string, id: number) {
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

  async updateTicket(
    user: string,
    role: string,
    ticketPayload: updateTicketDto,
  ) {
    try {
      //! i will think like user only use one sellingOption
      let availableTicketCondition = [];
      ticketPayload.seats.forEach((x) => {
        availableTicketCondition.push({
          row: x.row,
          column: x.col,
          eventId: ticketPayload.eventId,
          status: false,
          sellingOption: ticketPayload.sellingOption,
        });
      });

      const availableTickets = await this.ticketRepository.find({
        where: availableTicketCondition,
        order: {
          row: 'ASC',
          column: 'ASC',
        },
      });

      if (ticketPayload.seats.length != availableTickets.length) {
        return 'Selected seats are not available.';
      }

      //! Tickets will come as a nested array
      if (ticketPayload.sellingOption == 'even') {
        //! we can only buy tickets in quantity that is even
        if (ticketPayload.seats.length % 2 == 0) {
          ticketPayload.seats.forEach((x) => {
            this.ticketRepository.update(
              {
                row: x.row,
                column: x.col,
                sellingOption: 'even',
              },
              {
                status: true,
                username: user,
              },
            );
          });
          return 'Seats reserved.';
        } else {
          return 'Selected seats are not even.';
        }
      } else if (ticketPayload.sellingOption == 'all together') {
        //! we can buy tickets if all seats will be around each other
        let allTogetherStatus = true;

        const sortedSeats = ticketPayload.seats.sort(function (a, b) {
          if (a[0] == b[0]) {
            return a[1] - b[1];
          }
          return a[0] - b[0];
        });

        for (let x = 0; x < sortedSeats.length; x++) {
          if (x != sortedSeats.length - 1) {
            if (
              sortedSeats[x].col != sortedSeats[x + 1].col - 1 &&
              sortedSeats[x].col != sortedSeats[x + 1].col + 1 &&
              sortedSeats[x].col != sortedSeats[x + 1].col
            ) {
              allTogetherStatus = false;
            }
            if (
              sortedSeats[x].row != sortedSeats[x + 1].row - 1 &&
              sortedSeats[x].row != sortedSeats[x + 1].row + 1 &&
              sortedSeats[x].row != sortedSeats[x + 1].row
            ) {
              allTogetherStatus = false;
            }
          }
        }

        ticketPayload.seats.forEach((x) => {
          if (allTogetherStatus == false) {
            this.ticketRepository.update(
              {
                row: x.row,
                column: x.col,
                sellingOption: 'all together',
              },
              {
                status: true,
                username: user,
              },
            );
          }
        });
        return 'Seats reserved.';
      } else if (ticketPayload.sellingOption == 'avoid one') {
        //! we can only buy tickets in a quantity that will not leave only 1 ticket
        if (availableTickets.length - ticketPayload.seats.length != 1) {
          ticketPayload.seats.forEach((x) => {
            this.ticketRepository.update(
              {
                row: x.row,
                column: x.col,
                sellingOption: 'avoid one',
              },
              {
                status: true,
                username: user,
              },
            );
          });
          return 'Seats reserved.';
        } else {
          return null;
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
