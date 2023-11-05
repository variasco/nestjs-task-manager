import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import serverConfig from 'config/server.config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmFactory } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./config/.env'],
      load: [serverConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: TypeOrmFactory,
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
