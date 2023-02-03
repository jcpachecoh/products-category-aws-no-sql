import { HttpStatus } from '@nestjs/common';

export class MessageResponse {
  status: HttpStatus;
  message?: string;
}
