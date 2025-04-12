import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRoutes from '../controllers/user.controller'
import taskRoutes from 'src/controllers/task.controller'
import boardRoutes from 'src/controllers/board.controller'
import columnRoutes from 'src/controllers/column.controller'
import errorHandler from 'src/utils/errorHandler'

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
