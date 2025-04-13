import { handle } from 'hono/vercel'
import createApp from '../src/server/server'

const app = createApp()

export default handle(app)
