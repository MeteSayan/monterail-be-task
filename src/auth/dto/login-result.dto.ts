import { ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty({ description: 'JWT token' })
  token: string;
}
