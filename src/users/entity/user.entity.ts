import { Entity, Column, PrimaryColumn  } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;
  
  @Column({nullable: true, select: false})
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({nullable: true})
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: "agent"})
  role: string;
}