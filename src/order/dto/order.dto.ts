import { ApiProperty } from '@nestjs/swagger';

export class orderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  username: string;
}
