import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  eventId: number;

  @ApiProperty()
  @Column()
  ticketId: number;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  username: string;
}
