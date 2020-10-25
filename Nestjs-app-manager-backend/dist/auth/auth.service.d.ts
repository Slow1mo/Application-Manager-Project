import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
}
