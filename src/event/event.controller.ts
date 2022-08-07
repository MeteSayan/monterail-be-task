import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { createEventDto } from './dto/createEvent.dto';
import { Event } from './entity/event.entity';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @ApiTags('Event')
  @Get('/')
  async getEvents() {
    //! Get all events
    return await this.eventService.getEvents();
  }

  @ApiTags('Event')
  @Get('/:id')
  async getEvent(@Param('id') id: number) {
    //! Get event by id
    return await this.eventService.getEvent(id);
  }

  @ApiTags('Event')
  @Post('/')
  async createEvent(
    @User() user: string,
    @Role() role: string,
    @Body() event: createEventDto,
  ) {
    //! Create event
    return await this.eventService.createEvent(user, role, event);
  }

  @ApiTags('Event')
  @Put('/')
  async updateEvent(@Role() role: string, @Body() event: Event) {
    //! Update event
    return await this.eventService.updateEvent(role, event);
  }

  @ApiTags('Event')
  @Delete('/')
  async deleteEvent(@Role() role: string, @Body() event: Event) {
    //! Delete event
    return await this.eventService.deleteEvent(role, event);
  }
}
