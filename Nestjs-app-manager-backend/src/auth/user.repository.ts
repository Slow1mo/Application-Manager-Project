import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpCredentialsDTO } from './DTO/signup-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const {username, password} = authCredentialsDTO;
    
        const salt = await bcrypt.genSalt(); //salt generates a prefix (unique per user), so hashed passwords cannot be decrypted on websites
        const user = new User();
        user.username = username;
        // user.fullname = fullname;
        // user.email = email;
        // user.number = number;
        // user.address = address;
        // user.postalcode = postalcode;
        // user.city = city;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt); 

        try {
           await user.save(); 
        } catch (error) {
            if( error.code === '23505')  {  //throw error if duplicate username
                throw new ConflictException('Username already exists.');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const { username, password} = authCredentialsDTO;
        const user = await this.findOne({ username});

        if(user && await user.validatePassword(password)) {
            return user.username;
        }else{
            return null;
        }
    
    }

    private async hashPassword (password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}