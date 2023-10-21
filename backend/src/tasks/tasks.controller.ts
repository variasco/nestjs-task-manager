import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getOneTask(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getOneTask(id);

    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  @Post()
  async createPost(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
