import { validator } from 'hono/validator'
import { z } from 'zod'

export default {
    taskId: validator('param', (value, c) => {
        const schema = z.object({
            id: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'Invalid task ID' }, 400)
        }
        return result.data
    }),

    createTask: validator('json', (value, c) => {
        const schema = z.object({
            title: z.string().min(3).max(100),
            description: z.string().min(10).max(500),
            image: z.union([z.string().url(), z.literal('')]).optional(),
            columnId: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    }),

    updateTask: validator('json', (value, c) => {
        const schema = z.object({
            title: z.string().min(3).max(100),
            description: z.string().min(10).max(500).optional(),
            image: z.string().url().optional().or(z.literal('').transform(() => null)),
            columnId: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    }),

    moveTask: validator('json', (value, c) => {
        const schema = z.object({
            columnId: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    })
}