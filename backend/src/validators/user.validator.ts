import { validator } from 'hono/validator'
import { z } from 'zod'

export default {
    userId: validator('param', (value, c) => {
        const schema = z.object({
            id: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'Invalid user ID' }, 400)
        }
        return result.data
    }),

    createUser: validator("json", (value, c) => {
        const schema = z.object({
            name: z.string().min(3).max(50),
            email: z.string().email(),
            password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        });

        const result = schema.safeParse(value);
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400);
        }
        return result.data;
    }),


    updateUser: validator('json', (value, c) => {
        const schema = z.object({
            name: z.string().min(3).max(50).optional(),
            email: z.string().email().optional()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    })
}