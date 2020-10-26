import { BaseEntity } from 'typeorm';
import { Application } from '../apps/application.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    applications: Application[];
    validatePassword(password: string): Promise<boolean>;
}
