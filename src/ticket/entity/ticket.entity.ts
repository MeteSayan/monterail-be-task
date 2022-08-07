import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Ticket {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  eventId: number;

  @ApiProperty()
  @Column()
  row: number;

  @ApiProperty()
  @Column()
  column: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  sellingOption: string;

  @ApiProperty()
  @Column({ default: false })
  status: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  username: string;
}
