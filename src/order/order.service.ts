import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { updateOrderDto } from './dto/updateOrder.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getOrders(user: string, role: string) {
    try {
      return await this.orderRepository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getOrder(user: string, role: string, id: number) {
    try {
      if (role == 'admin') {
        return await this.orderRepository.findOneBy({ id: id });
      } else {
        return await this.orderRepository.findOneBy({ id: id, username: user });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateOrder(user: string, role: string, orderPayload: updateOrderDto) {
    try {
      const order = await this.orderRepository.findOneBy({
        id: orderPayload.id,
        username: user,
      });
      if (!order) {
        return null;
      }
      order.status = orderPayload.status;
      return await this.orderRepository.save(orderPayload);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Cron('1 * * * * *')
  async deleteOrder() {
    console.log('test');

    try {
      let ticketIdsForQuery = '';
      let orderIdsForQuery = '';
      const sql = `
      SELECT *
FROM public.order
WHERE created_at < NOW() - INTERVAL '15 minutes'
  AND status = 'waiting';
      `;
      const order = await this.orderRepository.query(sql);
      console.log(order);

      if (order.length < 1) {
        return null;
      }

      let ticketsWillReleased = [];
      for (let x = 0; x < order.length; x++) {
        let tempArr = order[x].ticket_ids.split(',');
        ticketsWillReleased = ticketsWillReleased.concat(tempArr); // all ticket ids will be released
        if (x == 0) {
          orderIdsForQuery += `id = ${order[x].id} `;
        } else {
          orderIdsForQuery += `OR id = ${order[x].id} `;
        }
      }

      for (let x = 0; x < ticketsWillReleased.length; x++) {
        if (x == 0) {
          ticketIdsForQuery += `id = ${ticketsWillReleased[x]} `;
        } else {
          ticketIdsForQuery += `OR id = ${ticketsWillReleased[x]} `;
        }
      }

      let ticketUpdateQuery = `UPDATE public.ticket
      SET status = false
      WHERE ${ticketIdsForQuery};`;
      let orderDeleteQuery = `DELETE
      FROM public.order
      WHERE ${orderIdsForQuery};`;

      this.orderRepository.query(ticketUpdateQuery);
      this.orderRepository.query(orderDeleteQuery);

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
