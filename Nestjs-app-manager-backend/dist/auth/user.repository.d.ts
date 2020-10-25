import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>;
    validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string>;
    private hashPassword;
}
