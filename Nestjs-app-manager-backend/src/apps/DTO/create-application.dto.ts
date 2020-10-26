import {IsNotEmpty} from 'class-validator';


export class CreateApplicationDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

