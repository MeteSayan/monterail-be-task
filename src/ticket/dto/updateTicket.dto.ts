import { ApiProperty } from '@nestjs/swagger';

export class updateTicketDto {
  id: string;

  @ApiProperty()
  eventId: number;

  @ApiProperty()
  seats: Array<{
    row: number;
    col: number;
  }>;

  @ApiProperty()
  sellingOption: string;
}
