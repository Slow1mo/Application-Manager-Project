import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
}
