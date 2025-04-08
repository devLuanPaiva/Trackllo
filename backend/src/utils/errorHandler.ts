import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

interface ErrorResponse {
    status: number
    message: string
    errors?: any[]
}

export default function errorHandler(error: Error, c: Context) {
    if (error instanceof HTTPException) {
        return error.getResponse()
    }

    let status = 500
    let message = 'Internal Server Error'
    let errors: any[] | undefined = undefined

    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        status = 400
        message = 'Database error occurred'

        if (error.message.includes('Unique constraint')) {
            message = 'Duplicate entry - this resource already exists'
            status = 409
        } else if (error.message.includes('Record to update not found')) {
            message = 'Resource not found'
            status = 404
        }
    } else if (error instanceof Error && error.name === 'ValidationError') {
        status = 422
        message = 'Validation failed'
        // @ts-ignore
        errors = error.errors
    }

    const errorResponse: ErrorResponse = { status, message }
    if (errors) errorResponse.errors = errors

    return c.json(errorResponse, { status: status as any })

}