import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryColumn()
  id: string;

  @Column()
  eventId: string;

  @Column()
  row: number;

  @Column()
  column: number;

  @Column()
  type: string;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  username: string;
}
