import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // async getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
  //   if (Object.keys(filterDto)) {
  //     return this.tasksService.getFilteredTasks(filterDto);
  //   }

  //   return this.tasksService.getAllTasks();
  // }

  @Get(':id')
  async getOneTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createPost(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete(':id')
  // async deleteTask(@Param('id') id: string): Promise<void> {
  //   const task = await this.tasksService.getTaskById(id);
  //   this.tasksService.deleteTask(task.id);
  // }

  // @Patch(':id/status')
  // async updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Promise<Task> {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
