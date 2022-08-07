import { Controller, UseGuards, Get, Put, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/auth/user.decorator';
import { updateTicketDto } from './dto/updateTicket.dto';

@Controller('ticket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @ApiTags('Ticket')
  @Get('/tickets')
  async getTickets(@User() user: string, @Role() role: string) {
    return await this.ticketService.getTickets(user, role);
  }

  @ApiTags('Ticket')
  @Get('/reserved-tickets')
  async getReservedTickets(@User() user: string, @Role() role: string) {
    return await this.ticketService.getReservedTickets(user, role);
  }

  @ApiTags('Ticket')
  @Get('/reserved-tickets/:id')
  async getReservedTicketsByEventId(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: number,
  ) {
    return await this.ticketService.getReservedTicketsByEventId(user, role, id);
  }

  @ApiTags('Ticket')
  @Get('/tickets/:id')
  async getTicket(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: number,
  ) {
    return await this.ticketService.getTicket(user, role, id);
  }

  @ApiTags('Ticket')
  @Put('/tickets/')
  async updateTicket(
    @User() user: string,
    @Role() role: string,
    @Body() ticket: updateTicketDto,
  ) {
    return await this.ticketService.updateTicket(user, role, ticket);
  }
}
