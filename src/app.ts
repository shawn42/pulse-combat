import { Elysia } from 'elysia'
import {
  dmStart, dmPause, dmReset, dmContinue,
  addEntity, removeEntity, removeEntityByName,
  setFateDuration, setEntityDuration,
  tapFate, tapEnergy, tapAction, tapBonus, tapReact,
} from './state.ts'
import { getState, setState, addClient, removeClient, broadcast } from './store.ts'

function dispatch(msg: unknown): void {
  if (typeof msg !== 'string') return
  let action: Record<string, unknown>
  try { action = JSON.parse(msg) } catch { return }

  const s = getState()
  switch (action.type) {
    case 'dm:start':    setState(dmStart(s)); break
    case 'dm:pause':    setState(dmPause(s)); break
    case 'dm:reset':    setState(dmReset()); break
    case 'dm:continue': setState(dmContinue(s)); break
    case 'dm:addNPC':
      setState(addEntity(s, action.name as string, action.npcType as 'monster' | 'minion')); break
    case 'dm:removeNPC':
      setState(removeEntity(s, action.id as string)); break
    case 'dm:setFateDuration':
      setState(setFateDuration(s, action.seconds as number)); break
    case 'dm:setEntityDuration':
      setState(setEntityDuration(s, action.id as string, action.seconds as number)); break
    case 'tap:fate':   setState(tapFate(s)); break
    case 'tap:energy': setState(tapEnergy(s, action.id as string)); break
    case 'tap:action': setState(tapAction(s, action.id as string)); break
    case 'tap:bonus':  setState(tapBonus(s, action.id as string)); break
    case 'tap:react':  setState(tapReact(s, action.id as string)); break
    case 'player:leave':
      setState(removeEntityByName(s, action.name as string)); break
  }
  broadcast()
}

export const app = new Elysia()
  .get('/', () => Bun.file('src/views/shared.html'))
  .get('/dm', () => Bun.file('src/views/dm.html'))
  .ws('/ws', {
    open(ws) { addClient(ws) },
    close(ws) { removeClient(ws) },
    message(_ws, msg) { dispatch(msg) },
  })
  .get('/:name', ({ params: { name } }) => {
    const s = getState()
    if (!s.entities.some(e => e.name === name && e.type === 'player')) {
      setState(addEntity(s, name, 'player'))
      broadcast()
    }
    return Bun.file('src/views/player.html')
  })
