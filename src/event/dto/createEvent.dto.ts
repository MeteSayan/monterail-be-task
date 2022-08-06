import { ApiProperty } from '@nestjs/swagger';

export class createEventDto {
  id: string;

  status: boolean;

  @ApiProperty()
  description: string;

  createdBy: string;

  @ApiProperty()
  row: number;

  @ApiProperty()
  column: number;

  @ApiProperty()
  type: string;
}
