import type { Context } from 'hono'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET ?? 'secrettoken'

export const authMiddleware = async (c: Context, next: Function) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader ? authHeader.split(' ')[1] : null;
    try {
        const decoded = jwt.verify(token!, SECRET) as { id: string };
        c.set('userId', decoded.id)
        await next()
    } catch (error) {
        return c.json({ error: 'Invalid token' }, 401)
    }
}
