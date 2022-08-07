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
  async getTickets() {
    //! Get all tickets
    return await this.ticketService.getTickets();
  }

  @ApiTags('Ticket')
  @Get('/reserved-tickets')
  async getReservedTickets(@Role() role: string) {
    //! Get all reserved tickets
    return await this.ticketService.getReservedTickets(role);
  }

  @ApiTags('Ticket')
  @Get('/reserved-tickets/:id')
  async getReservedTicketsByEventId(
    @Role() role: string,
    @Param('id') id: number,
  ) {
    //! Get reserved ticket with event id
    return await this.ticketService.getReservedTicketsByEventId(role, id);
  }

  @ApiTags('Ticket')
  @Get('/tickets/:id')
  async getTicket(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: number,
  ) {
    //! Get ticket with id
    return await this.ticketService.getTicket(user, role, id);
  }

  @ApiTags('Ticket')
  @Put('/tickets/')
  async updateTicket(@User() user: string, @Body() ticket: updateTicketDto) {
    //! Update tickets
    return await this.ticketService.updateTicket(user, ticket);
  }
}
