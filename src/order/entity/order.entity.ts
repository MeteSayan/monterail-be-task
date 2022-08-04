import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  eventId: string;

  @Column()
  ticketId: string;

  @Column()
  status: string;

  @Column()
  username: string;
}
