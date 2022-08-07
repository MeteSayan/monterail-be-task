import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  createdBy: string;

  @ApiProperty({ required: true, type: Array })
  @Column({
    nullable: false,
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  seats: Array<{
    row: number;
    col: number;
    sellingOption: string;
    price: number;
  }>;

  @ApiProperty()
  @Column()
  type: string;
}
