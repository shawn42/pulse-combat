import os from 'os'
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

const nets = os.networkInterfaces()
const lanIPs = Object.values(nets).flat()
  .filter(n => n && n.family === 'IPv4' && !n.internal)
  .map(n => n!.address)

console.log(`\n⚔  Pulse Combat`)
console.log(`   Local:   http://localhost:${server.port}`)
for (const ip of lanIPs) {
  console.log(`   Network: http://${ip}:${server.port}`)
}
console.log()
