import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class AppModule {}
