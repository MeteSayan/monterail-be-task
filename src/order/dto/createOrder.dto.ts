import { ApiProperty } from '@nestjs/swagger';

export class createOrderDto {
  id: number;

  @ApiProperty()
  eventId: number;

  @ApiProperty()
  ticketId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;

  username: string;
}
