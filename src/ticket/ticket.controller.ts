import { Controller, UseGuards, Get, Put, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/auth/user.decorator';
import { ticketDto } from './dto/ticket.dto';

@Controller('ticket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @ApiTags('Ticket')
  @Get('/')
  async getTickets(@User() user: string, @Role() role: string) {
    return await this.ticketService.getTickets(user, role);
  }

  @ApiTags('Ticket')
  @Get('/:id')
  async getTicket(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: string,
  ) {
    return await this.ticketService.getTicket(user, role, id);
  }

  @ApiTags('Ticket')
  @Put('/:id')
  async updateTicket(
    @User() user: string,
    @Role() role: string,
    @Body() ticket: ticketDto,
  ) {
    return await this.ticketService.updateTicket(user, role, ticket);
  }
}
