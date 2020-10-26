import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ApplicationStatus } from '../application-status.enum';

export class ApplicationStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ApplicationStatus.OPEN,
    ApplicationStatus.IN_PROGRESS,
    ApplicationStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}