import { validator } from 'hono/validator'
import { z } from 'zod'

export default {
    boardId: validator('param', (value, c) => {
        const schema = z.object({
            id: z.string().uuid()
        })

        const result = schema.safeParse(value)
        if (!result.success) {
            return c.json({ error: 'Invalid board ID' }, 400)
        }
        return result.data
    })
}