import { validator } from 'hono/validator'
import { z } from 'zod'

export default {
    userId: validator('param', (value, c) => {
        const schema = z.object({
            id: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'ID de usuário inválido' }, 400)
        }
        return result.data
    }),

    createUser: validator("json", (value, c) => {
        const schema = z.object({
            name: z
                .string()
                .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
                .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
            email: z.string().email({ message: 'E-mail inválido' }),
            password: z
                .string()
                .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
        });

        const result = schema.safeParse(value);
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400);
        }
        return result.data;
    }),


    updateUser: validator('json', (value, c) => {
        const schema = z.object({
            name: z
                .string()
                .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
                .max(50, { message: 'O nome deve ter no máximo 50 caracteres' })
                .optional(),
            email: z.string().email({ message: 'E-mail inválido' }).optional(),
        });

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400)
        }
        return result.data
    }),
    loginUser: validator("json", (value, c) => {
        const schema = z.object({
            email: z.string().email({ message: 'E-mail inválido' }),
            password: z
                .string()
                .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
        });

        const result = schema.safeParse(value);
        if (!result.success) {
            return c.json({ error: result.error.errors }, 400);
        }
        return result.data;
    }),

}