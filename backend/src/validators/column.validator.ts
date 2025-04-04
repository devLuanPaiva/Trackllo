import { validator } from 'hono/validator'
import { z } from 'zod'

export default {
    columnId: validator('param', (value, c) => {
        const schema = z.object({
            id: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'Invalid column ID' }, 400)
        }
        return result.data
    }),

    boardId: validator('param', (value, c) => {
        const schema = z.object({
            boardId: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'Invalid board ID' }, 400)
        }
        return result.data
    }),

    createColumn: validator('json', (value, c) => {
        const schema = z.object({
            boardId: z.string().uuid(),
            title: z.string().min(3).max(50)
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    }),

    updateColumn: validator('json', (value, c) => {
        const schema = z.object({
            title: z.string().min(3).max(50)
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    })
}