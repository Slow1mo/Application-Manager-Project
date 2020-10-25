import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDTO } from './DTO/signup-credentials.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(signupCredentialsDTO: SignUpCredentialsDTO): Promise<void>;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
}
