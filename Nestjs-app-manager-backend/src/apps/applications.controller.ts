import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { CreateApplicationDTO } from './DTO/create-application.dto';
import { ApplicationStatusValidationPipe } from './pipes/application-status-validation.pipe';
import { Application } from './application.entity';
import { ApplicationStatus } from './application-status.enum';
import { GetApplicationsFilterDTO } from './DTO/get-application-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(AuthGuard())
export class ApplicationsController {
  private logger = new Logger('ApplicationsController');
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  getApplications(@Query(ValidationPipe) filterDTO: GetApplicationsFilterDTO, @GetUser() user: User): Promise<Application[]> {
    this.logger.verbose(`User "${user.username}" retrieving all applications. Filters: ${JSON.stringify(filterDTO)}`);
    return this.applicationsService.getApplications(filterDTO, user);
    
  }

  @Get('/:id')
  getApplicationById(@Param('id', ParseIntPipe) id: number,
  @GetUser() user: User,): Promise<Application> {
    return this.applicationsService.getApplicationById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createApplication(
    @Body() createApplicationDTO: CreateApplicationDTO, 
    @GetUser() user: User,): Promise<Application> {
    this.logger.verbose(`User "${user.username}" creating a new application. Data ${JSON.stringify(createApplicationDTO)}`);
    return this.applicationsService.createApplication(createApplicationDTO, user);
  }

  @Delete('/:id')
  deleteApplication(@Param('id', ParseIntPipe) id: number,
   @GetUser() user: User): Promise<void> {
    return this.applicationsService.deleteApplication(id, user);
  }

  @Patch('/:id/status')
  updateApplicationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ApplicationStatusValidationPipe) status: ApplicationStatus,
    @GetUser() user: User,
  ): Promise<Application> {
    return this.applicationsService.updateApplicationStatus(id, status, user);
  }
}