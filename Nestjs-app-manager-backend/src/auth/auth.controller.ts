import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
import { SignUpCredentialsDTO } from './DTO/signup-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
        
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Post('/signin') 
    signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDTO);
    } 


}

    