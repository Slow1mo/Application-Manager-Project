import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Provide a stronger password: at least 1 UPPERCASE letter, at least 1 number, at least 1 lowercase letter'})
    password: string;
}