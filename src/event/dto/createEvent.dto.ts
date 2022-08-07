import { ApiProperty } from '@nestjs/swagger';

export class createEventDto {
  id: number;

  status: boolean;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  createdBy: string;

  @ApiProperty()
  seats: Array<{
    row: number;
    col: number;
    sellingOption: string;
    price: number;
  }>;

  @ApiProperty()
  type: string;
}
