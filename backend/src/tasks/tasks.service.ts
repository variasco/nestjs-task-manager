import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
}
