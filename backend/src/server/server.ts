import { Hono } from 'hono'
import { cors } from 'hono/cors'
import boardRoutes from '../controllers/board.controller'
import columnRoutes from '../controllers/column.controller'
import taskRoutes from '../controllers/task.controller'
import userRoutes from '../controllers/user.controller'
import errorHandler from '../utils/errorHandler'


const createApp = () => {
    const app = new Hono()

    app.use('*', cors())
    app.use('*', async (c, next) => {
        console.log(`[${c.req.method}] ${c.req.url}`)
        await next()
    })

    app.get('/', (c) => c.text('Hello Hono!'))
    app.route('/users', userRoutes)
    app.route('/tasks', taskRoutes)
    app.route('/boards', boardRoutes)
    app.route('/columns', columnRoutes)
    app.onError(errorHandler)

    return app
}

export default createApp
