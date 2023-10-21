import { BadRequestException, PipeTransform } from '@nestjs/common';
import { STATUS_IS_NOT_VALID } from '../consts/response.consts';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = Object.values(TaskStatus);

  transform(value: string): string {
    value = value.toUpperCase();

    if (!this.isStatusValid(value as TaskStatus)) {
      throw new BadRequestException(STATUS_IS_NOT_VALID(value));
    }

    return value;
  }

  private isStatusValid<T extends TaskStatus>(status: T): boolean {
    const index = this.allowedStatuses.indexOf(status);

    return index !== -1;
  }
}
