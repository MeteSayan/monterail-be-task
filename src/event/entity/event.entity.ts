import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryColumn()
  id: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  row: number;

  @Column()
  column: number;

  @Column()
  type: string;
}
