import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDTO } from './DTO/create-application.dto';
import { GetApplicationsFilterDTO } from './DTO/get-application-filter.dto';
import { ApplicationRepository } from './application.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationStatus } from './application-status.enum';
import { User } from '../auth/user.entity';


@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,
  ) {}

  async getApplications(filterDTO: GetApplicationsFilterDTO, user: User): Promise<Application[]> {
    return this.applicationRepository.getApplications(filterDTO, user);
  }

  async getApplicationById(id: number, user: User): Promise<Application> {
    const found = await this.applicationRepository.findOne({where: { id, userId: user.id}});

    if (!found) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return found;
  }

  async createApplication(createApplicationDTO: CreateApplicationDTO, user: User): Promise<Application> {
    return this.applicationRepository.createApplication(createApplicationDTO, user);
  }

  async deleteApplication(id: number, user: User): Promise<void> {
    const result = await this.applicationRepository.delete({id, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }

  async updateApplicationStatus(id: number, status: ApplicationStatus, user: User): Promise<Application> {
    const application = await this.getApplicationById(id, user);
    application.status = status;
    await application.save();
    return application;
  }
}