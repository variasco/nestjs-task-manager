import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description);
  }
}
