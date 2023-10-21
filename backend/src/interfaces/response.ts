import { HttpStatus } from '@nestjs/common';

export interface HttpSuccessResponse {
  message: string;
  statusCode: HttpStatus;
}
