import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './model/task.entity';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './model/task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto)) {
      // return this.tasksService.getFilteredTasks(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getOneTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
