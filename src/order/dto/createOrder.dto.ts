import { ApiProperty } from '@nestjs/swagger';

export class createOrderDto {
  id: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  status: string;

  username: string;
}
