import { app, dispatch } from './app.ts'
import { startTicker } from './ticker.ts'
import { addClient, removeClient } from './store.ts'

startTicker()

const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    const url = new URL(req.url)
    if (url.pathname === '/ws' && req.headers.get('Upgrade') === 'websocket') {
      if (server.upgrade(req)) return
    }
    return app.handle(req)
  },
  websocket: {
    open(ws) { addClient(ws) },
    close(ws) { removeClient(ws) },
    message(_ws, msg) { dispatch(typeof msg === 'string' ? msg : msg.toString()) },
  },
})

console.log(`⚔ Pulse Combat running at http://localhost:${server.port}`)
