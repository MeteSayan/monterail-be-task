import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { User } from 'src/auth/user.decorator';
import { Role } from 'src/auth/role.decorator';
import { updateOrderDto } from './dto/updateOrder.dto';

@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiTags('Order')
  @Get('/')
  async getOrders(@User() user: string, @Role() role: string) {
    //! Get all orders
    return await this.orderService.getOrders(user, role);
  }

  @ApiTags('Order')
  @Get('/:id')
  async getOrder(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: number,
  ) {
    //! Get order with id
    return await this.orderService.getOrder(user, role, id);
  }

  @ApiTags('Order')
  @Put('/')
  async updateOrder(
    @User() user: string,
    @Role() role: string,
    @Body() order: updateOrderDto,
  ) {
    //! Update order
    return await this.orderService.updateOrder(user, role, order);
  }
}
