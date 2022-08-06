import { ApiProperty } from '@nestjs/swagger';

export class eventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  row: number;

  @ApiProperty()
  column: number;

  @ApiProperty()
  type: string;
}
