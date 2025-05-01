import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

interface ErrorResponse {
    status: number;
    message: string;
    errors?: any[];
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();


        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let errors: any[] | undefined = undefined;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse();
            if (typeof responseData === 'string') {
                message = responseData;
            } else if (typeof responseData === 'object' && responseData !== null) {
                message = (responseData as any).message ?? message;
                errors = (responseData as any).errors ?? undefined;
            }
        } else if (
            exception instanceof Prisma.PrismaClientKnownRequestError
        ) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Database error occurred';

            if (exception.message.includes('Unique constraint')) {
                status = HttpStatus.CONFLICT;
                message = 'Duplicate entry - this resource already exists';
            } else if (exception.message.includes('Record to update not found')) {
                status = HttpStatus.NOT_FOUND;
                message = 'Resource not found';
            }
        } else if (
            exception instanceof Error &&
            exception.name === 'ValidationError'
        ) {
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            message = 'Validation failed';
            // @ts-ignore
            errors = exception.errors;
        }

        const errorResponse: ErrorResponse = { status, message };
        if (errors) errorResponse.errors = errors;

        response.status(status).json(errorResponse);
    }
}
