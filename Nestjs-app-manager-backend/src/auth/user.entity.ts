import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()  //validation happens at database level
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    
    // @Column()
    // email: string;
    
    // @Column()
    // fullname: string;
    
    // @Column()
    // number: string;

    // @Column()
    // address: string;

    // @Column()
    // postalcode: string;

    // @Column()
    // city: string;

    @Column()
    salt : string;

    @OneToMany(type => Task, task => task.user, {eager : true})
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}