import { serve } from '@hono/node-server'
import createApp from './server/server.js'

const app = createApp()

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`✅ Server is running on http://localhost:${info.port}`)
})
