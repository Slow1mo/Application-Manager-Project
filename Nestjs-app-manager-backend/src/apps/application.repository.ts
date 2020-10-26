import { Application } from './application.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateApplicationDTO } from './DTO/create-application.dto';
import { ApplicationStatus } from './application-status.enum';
import { GetApplicationsFilterDTO } from './DTO/get-application-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  private logger = new Logger('ApplicationRepository');
  async getApplications(filterDTO: GetApplicationsFilterDTO, user: User,): Promise<Application[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('application');

    query.where('application.userId= :userId',{userId: user.id});
    
    if (status) {
      query.andWhere('application.status = :status', { status });
    }

    if (search) {
      query.andWhere('(application.title LIKE :search OR application.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const applications = await query.getMany();
      return applications;
    } catch (error) {
      this.logger.error(`Failed to get applications for user "${user.username}". Filters: ${JSON.stringify(filterDTO)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createApplication(createApplicationDTO: CreateApplicationDTO, user: User,): Promise<Application> {
    const { title, description } = createApplicationDTO;

    const application = new Application();
    application.title = title;
    application.description = description;
    application.status = ApplicationStatus.OPEN;
    application.user = user;
    try { 
      await application.save();
    } catch(error) {
      this.logger.error(`Failed to create a application for user "${user.username}". Data: ${createApplicationDTO}`,error.stack);
      throw new InternalServerErrorException();
    }
   

    delete application.user; //what is returned wont contain the user object, which contains sensitive data

    return application;
  }
}