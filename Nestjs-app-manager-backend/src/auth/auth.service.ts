import { Body, Injectable, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignUpCredentialsDTO } from './DTO/signup-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(@Body(ValidationPipe)authCredentialsDTO : AuthCredentialsDTO) : Promise<void> { //validation pipe will validate the dto with the specified rules.
        return this.userRepository.signUp(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO) : Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO);
       
        if (!username) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
}
