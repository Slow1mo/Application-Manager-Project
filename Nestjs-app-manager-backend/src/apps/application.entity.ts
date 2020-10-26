import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicationStatus } from './application-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ApplicationStatus;

  @ManyToOne(type => User , user => user.applications, {eager : false})
  user: User;

  @Column()
  userId: number;
}