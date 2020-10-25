import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
import { SignUpCredentialsDTO } from './DTO/signup-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signupCredentialsDTO: SignUpCredentialsDTO): Promise<void>;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
}
