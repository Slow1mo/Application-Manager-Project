import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ApplicationStatus } from '../application-status.enum';

export class GetApplicationsFilterDTO {
    @IsOptional()
    @IsIn([ApplicationStatus.OPEN, ApplicationStatus.IN_PROGRESS, ApplicationStatus.CLOSED])
    status: ApplicationStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}

