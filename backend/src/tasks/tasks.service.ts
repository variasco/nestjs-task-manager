import { Injectable, NotFoundException } from '@nestjs/common';
import { TASK_NOT_FOUND } from './consts/response.consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './model/task-status.enum';
import { Task } from './model/task.entity';
import { TaskRepository } from './model/task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // async getFilteredTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
  //   const { search, status } = filterDto;
  //   let tasks = await this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) => task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(TASK_NOT_FOUND(id));
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(TASK_NOT_FOUND(id));
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    return task.save();
  }
}
