import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from "../model/task-status.enum";

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
