import { handle } from 'hono/vercel'
import createApp from '../src/server/server.js'

const app = createApp()

export default handle(app)
