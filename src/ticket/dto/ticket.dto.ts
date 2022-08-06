import { ApiProperty } from '@nestjs/swagger';

export class ticketDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  row: number;

  @ApiProperty()
  column: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  username: string;
}
