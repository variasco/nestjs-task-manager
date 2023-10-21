import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HttpSuccessResponse } from 'src/interfaces/response';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto)) {
      return this.tasksService.getFilteredTasks(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getOneTask(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);

    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  @Post()
  async createPost(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    if (!createTaskDto.title || !createTaskDto.description) {
      throw new BadRequestException();
    }

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<HttpSuccessResponse> {
    const task = await this.tasksService.getTaskById(id);

    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    this.tasksService.deleteTask(id);
    return { message: 'Задача успешно удалена', statusCode: HttpStatus.OK };
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() patch: Pick<Task, 'status'>,
  ): Promise<Task> {
    const task = await this.tasksService.updateTaskStatus(id, patch.status);

    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    return task;
  }
}
