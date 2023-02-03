import { HttpStatus } from '@nestjs/common';

export class HttpResponse {
  status: HttpStatus;
  message: string;
}
