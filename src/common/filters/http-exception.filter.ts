import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;
    if (status === 400) {
      message = (exception.getResponse() as any).message;
    }

    response.status(status).json({
      url: request.url,
      timestamp: new Date().toISOString(),
      message,
      statusCode: status,
    });
  }
}
