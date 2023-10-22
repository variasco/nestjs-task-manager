import { Injectable, NotFoundException } from '@nestjs/common';
import { TASK_NOT_FOUND } from './consts/response.consts';
import { CreateTaskDto } from './dto/create-task.dto';
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
    const found = await this.taskRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(TASK_NOT_FOUND(id));
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // async deleteTask(id: string): Promise<void> {
  //   this.tasks.filter((task) => task.id !== id);
  // }
  // async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //   const newTask = await this.getTaskById(id);
  //   newTask.status = status;
  //   return newTask;
  // }
}
