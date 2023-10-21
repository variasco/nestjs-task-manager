import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TASK_NOT_FOUND } from './consts/response.consts';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getFilteredTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    let tasks = await this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) => task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(TASK_NOT_FOUND(id));
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks.filter((task) => task.id !== id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const newTask = await this.getTaskById(id);
    newTask.status = status;

    return newTask;
  }
}
