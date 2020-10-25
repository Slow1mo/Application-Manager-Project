import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDetailsDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsEmail()
    @MinLength(8)
    @MaxLength(30)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(26)
    @Matches(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,{message: 'Provide a name of 4 or more letters, with a space between first, middle and last name.'})
    fullname: string;

    @IsString()
    @MinLength(7)
    @MaxLength(15)
    @Matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, {message: 'Provide a valid international phonenumber that start with a "+", followed by a country code and national number.'})
    number : string;

    @IsString()
    @MinLength(3)
    address: string;

    @IsString()
    @MinLength(3)
    postalcode: string;

    @IsString()
    @MinLength(2)
    city: string;
    

}