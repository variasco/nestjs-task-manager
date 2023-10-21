import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

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

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: randomUUID(),
      title: title!,
      description: description!,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks.filter((task) => task.id !== id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | undefined> {
    const newTask = await this.getTaskById(id);
    if (!newTask) return;

    newTask.status = status;

    // const taskKey = this.tasks.findIndex((task) => task.id === id);

    // this.tasks[taskKey] = newTask;

    return newTask;
  }
}
