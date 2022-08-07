import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/createOrder.dto';
import { User } from 'src/auth/user.decorator';
import { Role } from 'src/auth/role.decorator';
import { Order } from './entity/order.entity';

@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiTags('Order')
  @Get('/')
  async getOrders(@User() user: string, @Role() role: string) {
    return await this.orderService.getOrders(user, role);
  }

  @ApiTags('Order')
  @Get('/:id')
  async getOrder(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: number,
  ) {
    return await this.orderService.getOrder(user, role, id);
  }

  @ApiTags('Order')
  @Post('/')
  async createOrder(
    @User() user: string,
    @Role() role: string,
    @Body() order: createOrderDto,
  ) {
    return await this.orderService.createOrder(user, role, order);
  }

  @ApiTags('Order')
  @Put('/:id')
  async updateOrder(
    @User() user: string,
    @Role() role: string,
    @Body() order: Order,
  ) {
    return await this.orderService.updateOrder(user, role, order);
  }
}
