import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { orderDto } from './dto/order.dto';
import { createOrderDto } from './dto/createOrder.dto';

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

  async getOrder(user: string, role: string, id: string) {
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

  async createOrder(user: string, role: string, orderPayload: createOrderDto) {
    try {
      orderPayload.username = user;
      return await this.orderRepository.save(orderPayload);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateOrder(user: string, role: string, orderPayload: orderDto) {
    try {
      const ticket = await this.orderRepository.findOneBy({
        id: orderPayload.id,
        username: user,
      });
      if (!ticket) {
        return null;
      }
      return await this.orderRepository.save(orderPayload);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
