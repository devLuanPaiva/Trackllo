import type { Context } from 'hono'

export function successResponse(c: Context, data: any, status = 200) {
    return c.json({
        success: true,
        data
    }, { status: status as any })

}

export function errorResponse(c: Context, message: string, status = 400, errors?: any[]) {
    return c.json({
        success: false,
        error: {
            message,
            ...(errors && { errors })
        }
    }, { status: status as any })
}