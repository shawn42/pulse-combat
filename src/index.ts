import { app } from './app.ts'
import { startTicker } from './ticker.ts'

startTicker()
app.listen(3000, () => console.log('⚔ Pulse Combat running at http://localhost:3000'))
