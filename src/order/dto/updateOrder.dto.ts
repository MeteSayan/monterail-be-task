import { ApiProperty } from '@nestjs/swagger';

export class updateOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  username: string;
}
