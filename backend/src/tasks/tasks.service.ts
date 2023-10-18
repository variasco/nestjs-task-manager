import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly tasks = [];

  async getAllTasks() {
    return this.tasks;
  }
}
