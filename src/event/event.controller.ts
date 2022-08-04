import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';

@Controller('event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(
    private eventService: EventService,
  ) {}
}
