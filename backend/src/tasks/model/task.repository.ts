import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/model/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }

  async createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      title,
      description,
      user,
    });

    await this.save(task);
    delete task.user;

    return task;
  }
}
