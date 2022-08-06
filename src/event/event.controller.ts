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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { createEventDto } from './dto/createEvent.dto';
import { eventDto } from './dto/event.dto';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @ApiTags('Event')
  @Get('/')
  async getEvents(@User() user: string, @Role() role: string) {
    return await this.eventService.getEvents(user, role);
  }

  @ApiTags('Event')
  @Get('/:id')
  async getEvent(
    @User() user: string,
    @Role() role: string,
    @Param('id') id: string,
  ) {
    return await this.eventService.getEvent(user, role, id);
  }

  @ApiTags('Event')
  @Post('/')
  async createEvent(
    @User() user: string,
    @Role() role: string,
    @Body() event: createEventDto,
  ) {
    return await this.eventService.createEvent(user, role, event);
  }

  @ApiTags('Event')
  @Put('/:id')
  async updateEvent(
    @User() user: string,
    @Role() role: string,
    @Body() event: eventDto,
  ) {
    return await this.eventService.updateEvent(user, role, event);
  }

  @ApiTags('Event')
  @Delete('/')
  async deleteEvent(
    @User() user: string,
    @Role() role: string,
    @Body() event: eventDto,
  ) {
    return await this.eventService.deleteEvent(user, role, event);
  }
}
