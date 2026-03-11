# Pulse Combat Timer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-WiFi web app for managing real-time D&D 5e combat timers across DM, player, and spectator views.

**Architecture:** Bun + Elysia server holds all timer state in memory and broadcasts full state to every WebSocket client at 10Hz. Clients are pure renderers — no timer logic, just display what the server sends and send action messages back. Three HTML views (DM, Player, Shared) are served as static files.

**Tech Stack:** Bun, Elysia 1.x, vanilla HTML/CSS/JS (no build step), bun:test

---

## File Map

| File | Responsibility |
|------|----------------|
| `src/state.ts` | `CombatState` types + all pure mutation functions |
| `src/store.ts` | Mutable state singleton, WebSocket client set, `broadcast()` |
| `src/ticker.ts` | 10Hz `setInterval` that ticks state and broadcasts |
| `src/app.ts` | Elysia app, HTTP routes, WebSocket handler, action dispatch |
| `src/index.ts` | Entry point: starts ticker, calls `app.listen()` |
| `src/views/shared.html` | Spectator view (read-only bars + join form) |
| `src/views/player.html` | Player view (own timer panel + action buttons) |
| `src/views/dm.html` | DM view (full control: start/pause/reset, entity management) |
| `tests/state.test.ts` | Unit tests for all state mutations |
| `tests/server.test.ts` | Route integration tests |

---

## Chunk 1: Project Setup + State Module

### Task 1: Initialize project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "claude-pulse",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "bun run src/index.ts",
    "test": "bun test"
  },
  "dependencies": {
    "elysia": "^1.3.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules/
.superpowers/
```

- [ ] **Step 4: Install dependencies**

Run: `bun install`
Expected: `bun install` completes, `node_modules/` and `bun.lockb` created.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.json .gitignore bun.lockb
git commit -m "chore: initialize project with Bun + Elysia"
```

---

### Task 2: State module

**Files:**
- Create: `src/state.ts`
- Create: `tests/state.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/state.test.ts`:

```typescript
import { describe, it, expect } from 'bun:test'
import {
  createInitialState,
  dmStart, dmPause, dmReset, dmContinue,
  addEntity, removeEntity, removeEntityByName,
  setFateDuration, setEntityDuration,
  tapFate, tapEnergy, tapAction, tapBonus, tapReact,
  tick,
} from '../src/state'

describe('createInitialState', () => {
  it('returns default state', () => {
    const s = createInitialState()
    expect(s.running).toBe(false)
    expect(s.dmPaused).toBe(false)
    expect(s.fatePaused).toBe(false)
    expect(s.fate.duration).toBe(30)
    expect(s.fate.current).toBe(30)
    expect(s.entities).toEqual([])
  })
})

describe('dmStart', () => {
  it('sets running true and clears dmPaused', () => {
    const s = dmStart(dmPause(createInitialState()))
    expect(s.running).toBe(true)
    expect(s.dmPaused).toBe(false)
  })
})

describe('dmPause', () => {
  it('sets dmPaused true', () => {
    const s = dmPause(dmStart(createInitialState()))
    expect(s.dmPaused).toBe(true)
  })
})

describe('dmReset', () => {
  it('returns fresh initial state', () => {
    let s = addEntity(dmStart(createInitialState()), 'Goblin', 'monster')
    s = dmReset()
    expect(s.entities).toHaveLength(0)
    expect(s.running).toBe(false)
  })
})

describe('dmContinue', () => {
  it('clears fatePaused, refills fate, sets running', () => {
    let s = dmStart(createInitialState())
    s = { ...s, fatePaused: true, fate: { ...s.fate, current: 0 } }
    s = dmContinue(s)
    expect(s.fatePaused).toBe(false)
    expect(s.running).toBe(true)
    expect(s.fate.current).toBe(s.fate.duration)
  })
})

describe('addEntity', () => {
  it('adds a monster with default timer', () => {
    const s = addEntity(createInitialState(), 'Goblin', 'monster')
    expect(s.entities).toHaveLength(1)
    expect(s.entities[0].name).toBe('Goblin')
    expect(s.entities[0].type).toBe('monster')
    expect(s.entities[0].timer.duration).toBe(15)
    expect(s.entities[0].timer.current).toBe(0)
  })

  it('player join reduces monster duration by 1', () => {
    let s = addEntity(createInitialState(), 'Boss', 'monster')
    s = addEntity(s, 'Alice', 'player')
    const boss = s.entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(14)
  })

  it('player join does not affect minion duration', () => {
    let s = addEntity(createInitialState(), 'Minion', 'minion')
    s = addEntity(s, 'Alice', 'player')
    const minion = s.entities.find(e => e.name === 'Minion')!
    expect(minion.timer.duration).toBe(15)
  })

  it('does not add duplicate player name', () => {
    let s = addEntity(createInitialState(), 'Alice', 'player')
    s = addEntity(s, 'Alice', 'player')
    expect(s.entities.filter(e => e.name === 'Alice')).toHaveLength(1)
  })
})

describe('removeEntity', () => {
  it('removes entity by id', () => {
    let s = addEntity(createInitialState(), 'Goblin', 'monster')
    s = removeEntity(s, s.entities[0].id)
    expect(s.entities).toHaveLength(0)
  })

  it('player leave increases monster duration by 1', () => {
    let s = addEntity(createInitialState(), 'Boss', 'monster')
    s = addEntity(s, 'Alice', 'player')
    const aliceId = s.entities.find(e => e.name === 'Alice')!.id
    s = removeEntity(s, aliceId)
    const boss = s.entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(15)
  })

  it('player leave does not affect minion duration', () => {
    let s = addEntity(createInitialState(), 'Minion', 'minion')
    s = addEntity(s, 'Alice', 'player')
    const aliceId = s.entities.find(e => e.name === 'Alice')!.id
    s = removeEntity(s, aliceId)
    const minion = s.entities.find(e => e.name === 'Minion')!
    expect(minion.timer.duration).toBe(15)
  })
})

describe('removeEntityByName', () => {
  it('removes player by name', () => {
    let s = addEntity(createInitialState(), 'Alice', 'player')
    s = removeEntityByName(s, 'Alice')
    expect(s.entities).toHaveLength(0)
  })

  it('no-ops if player not found', () => {
    const s = removeEntityByName(createInitialState(), 'Ghost')
    expect(s.entities).toHaveLength(0)
  })
})

describe('setFateDuration', () => {
  it('updates duration and resets current', () => {
    const s = setFateDuration(createInitialState(), 45)
    expect(s.fate.duration).toBe(45)
    expect(s.fate.current).toBe(45)
  })
})

describe('setEntityDuration', () => {
  it('updates only the target entity duration', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = setEntityDuration(s, id, 20)
    expect(s.entities[0].timer.duration).toBe(20)
  })
})

describe('tapFate', () => {
  it('empties bar when full', () => {
    const s = tapFate(createInitialState())
    expect(s.fate.current).toBe(0)
  })

  it('fills bar when not full', () => {
    let s = { ...createInitialState(), fate: { duration: 30, current: 10 } }
    s = tapFate(s)
    expect(s.fate.current).toBe(30)
  })
})

describe('tapEnergy', () => {
  it('fills bar when empty', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = tapEnergy(s, id)
    expect(s.entities[0].timer.current).toBe(15)
  })

  it('empties bar when full', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 15 } } : e) }
    s = tapEnergy(s, id)
    expect(s.entities[0].timer.current).toBe(0)
  })
})

describe('tapAction', () => {
  it('drains energy when full', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 15 } } : e) }
    s = tapAction(s, id)
    expect(s.entities[0].timer.current).toBe(0)
  })

  it('ignores when not full', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 14 } } : e) }
    s = tapAction(s, id)
    expect(s.entities[0].timer.current).toBe(14)
  })
})

describe('tapBonus', () => {
  it('removes 50% when at exactly 50%', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 7.5 } } : e) }
    s = tapBonus(s, id)
    expect(s.entities[0].timer.current).toBeCloseTo(0)
  })

  it('ignores when below 50%', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 7 } } : e) }
    s = tapBonus(s, id)
    expect(s.entities[0].timer.current).toBe(7)
  })
})

describe('tapReact', () => {
  it('removes 25% when at exactly 25%', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 3.75 } } : e) }
    s = tapReact(s, id)
    expect(s.entities[0].timer.current).toBeCloseTo(0)
  })

  it('ignores when below 25%', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 3 } } : e) }
    s = tapReact(s, id)
    expect(s.entities[0].timer.current).toBe(3)
  })
})

describe('tick', () => {
  it('does nothing when not running', () => {
    let s = addEntity(createInitialState(), 'Hero', 'player')
    s = tick(s, 0.1)
    expect(s.entities[0].timer.current).toBe(0)
    expect(s.fate.current).toBe(30)
  })

  it('does nothing when dmPaused', () => {
    let s = addEntity(dmPause(dmStart(createInitialState())), 'Hero', 'player')
    s = tick(s, 0.1)
    expect(s.entities[0].timer.current).toBe(0)
  })

  it('does nothing when fatePaused', () => {
    let s = addEntity(dmStart(createInitialState()), 'Hero', 'player')
    s = { ...s, fatePaused: true }
    s = tick(s, 0.1)
    expect(s.entities[0].timer.current).toBe(0)
  })

  it('increments entity timers when running', () => {
    let s = addEntity(dmStart(createInitialState()), 'Hero', 'player')
    s = tick(s, 0.1)
    expect(s.entities[0].timer.current).toBeCloseTo(0.1)
  })

  it('decrements fate timer when running', () => {
    const s = tick(dmStart(createInitialState()), 0.1)
    expect(s.fate.current).toBeCloseTo(29.9)
  })

  it('clamps entity timer at duration', () => {
    let s = addEntity(dmStart(createInitialState()), 'Hero', 'player')
    const id = s.entities[0].id
    s = { ...s, entities: s.entities.map(e => e.id === id ? { ...e, timer: { ...e.timer, current: 14.95 } } : e) }
    s = tick(s, 0.1)
    expect(s.entities[0].timer.current).toBe(15)
  })

  it('sets fatePaused when fate reaches 0', () => {
    let s = dmStart(createInitialState())
    s = { ...s, fate: { ...s.fate, current: 0.05 } }
    s = tick(s, 0.1)
    expect(s.fatePaused).toBe(true)
    expect(s.fate.current).toBe(0)
  })

  it('clamps fate current at 0', () => {
    let s = dmStart(createInitialState())
    s = { ...s, fate: { ...s.fate, current: 0.01 } }
    s = tick(s, 0.1)
    expect(s.fate.current).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test tests/state.test.ts`
Expected: `error: Cannot find module '../src/state'`

- [ ] **Step 3: Implement src/state.ts**

Create `src/state.ts`:

```typescript
export type EntityType = 'player' | 'monster' | 'minion'

export type Entity = {
  id: string
  name: string
  type: EntityType
  timer: {
    duration: number
    current: number
  }
}

export type CombatState = {
  running: boolean
  dmPaused: boolean
  fatePaused: boolean
  fate: {
    duration: number
    current: number
  }
  entities: Entity[]
}

export function createInitialState(): CombatState {
  return {
    running: false,
    dmPaused: false,
    fatePaused: false,
    fate: { duration: 30, current: 30 },
    entities: [],
  }
}

export function dmStart(state: CombatState): CombatState {
  return { ...state, running: true, dmPaused: false }
}

export function dmPause(state: CombatState): CombatState {
  return { ...state, dmPaused: true }
}

export function dmReset(): CombatState {
  return createInitialState()
}

export function dmContinue(state: CombatState): CombatState {
  return {
    ...state,
    fatePaused: false,
    running: true,
    fate: { ...state.fate, current: state.fate.duration },
  }
}

export function addEntity(state: CombatState, name: string, type: EntityType): CombatState {
  if (type === 'player' && state.entities.some(e => e.name === name && e.type === 'player')) {
    return state
  }
  const id = crypto.randomUUID()
  let entities = [...state.entities, { id, name, type, timer: { duration: 15, current: 0 } }]
  if (type === 'player') {
    entities = entities.map(e =>
      e.type === 'monster'
        ? { ...e, timer: { ...e.timer, duration: Math.max(1, e.timer.duration - 1) } }
        : e
    )
  }
  return { ...state, entities }
}

export function removeEntity(state: CombatState, id: string): CombatState {
  const entity = state.entities.find(e => e.id === id)
  if (!entity) return state
  let entities = state.entities.filter(e => e.id !== id)
  if (entity.type === 'player') {
    entities = entities.map(e =>
      e.type === 'monster'
        ? { ...e, timer: { ...e.timer, duration: e.timer.duration + 1 } }
        : e
    )
  }
  return { ...state, entities }
}

export function removeEntityByName(state: CombatState, name: string): CombatState {
  const entity = state.entities.find(e => e.name === name && e.type === 'player')
  if (!entity) return state
  return removeEntity(state, entity.id)
}

export function setFateDuration(state: CombatState, seconds: number): CombatState {
  return { ...state, fate: { duration: seconds, current: seconds } }
}

export function setEntityDuration(state: CombatState, id: string, seconds: number): CombatState {
  return {
    ...state,
    entities: state.entities.map(e =>
      e.id === id ? { ...e, timer: { ...e.timer, duration: seconds } } : e
    ),
  }
}

export function tapFate(state: CombatState): CombatState {
  const isFull = state.fate.current >= state.fate.duration
  return { ...state, fate: { ...state.fate, current: isFull ? 0 : state.fate.duration } }
}

export function tapEnergy(state: CombatState, id: string): CombatState {
  return {
    ...state,
    entities: state.entities.map(e => {
      if (e.id !== id) return e
      const isFull = e.timer.current >= e.timer.duration
      return { ...e, timer: { ...e.timer, current: isFull ? 0 : e.timer.duration } }
    }),
  }
}

export function tapAction(state: CombatState, id: string): CombatState {
  return {
    ...state,
    entities: state.entities.map(e => {
      if (e.id !== id) return e
      if (e.timer.current < e.timer.duration) return e
      return { ...e, timer: { ...e.timer, current: 0 } }
    }),
  }
}

export function tapBonus(state: CombatState, id: string): CombatState {
  return {
    ...state,
    entities: state.entities.map(e => {
      if (e.id !== id) return e
      const threshold = e.timer.duration * 0.5
      if (e.timer.current < threshold) return e
      return { ...e, timer: { ...e.timer, current: Math.max(0, e.timer.current - threshold) } }
    }),
  }
}

export function tapReact(state: CombatState, id: string): CombatState {
  return {
    ...state,
    entities: state.entities.map(e => {
      if (e.id !== id) return e
      const threshold = e.timer.duration * 0.25
      if (e.timer.current < threshold) return e
      return { ...e, timer: { ...e.timer, current: Math.max(0, e.timer.current - threshold) } }
    }),
  }
}

export function tick(state: CombatState, deltaSeconds: number): CombatState {
  if (!state.running || state.dmPaused || state.fatePaused) return state
  const newFateCurrent = Math.max(0, state.fate.current - deltaSeconds)
  const fatePaused = newFateCurrent <= 0
  const entities = state.entities.map(e => ({
    ...e,
    timer: { ...e.timer, current: Math.min(e.timer.duration, e.timer.current + deltaSeconds) },
  }))
  return { ...state, fatePaused, fate: { ...state.fate, current: newFateCurrent }, entities }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test tests/state.test.ts`
Expected: `34 tests passed`

- [ ] **Step 5: Commit**

```bash
git add src/state.ts tests/state.test.ts
git commit -m "feat: add state module with all combat mutations"
```

---

## Chunk 2: Server Infrastructure

### Task 3: Store + Ticker

**Files:**
- Create: `src/store.ts`
- Create: `src/ticker.ts`

- [ ] **Step 1: Create src/store.ts**

```typescript
import { createInitialState, type CombatState } from './state.ts'
import type { ServerWebSocket } from 'bun'

let _state: CombatState = createInitialState()
const _clients = new Set<ServerWebSocket<unknown>>()

export function getState(): CombatState { return _state }
export function setState(s: CombatState): void { _state = s }
export function resetState(): void { _state = createInitialState() }

export function addClient(ws: ServerWebSocket<unknown>): void { _clients.add(ws) }
export function removeClient(ws: ServerWebSocket<unknown>): void { _clients.delete(ws) }

export function broadcast(): void {
  const msg = JSON.stringify({ type: 'state', data: _state })
  for (const ws of _clients) {
    try { ws.send(msg) } catch { /* client disconnected */ }
  }
}
```

- [ ] **Step 2: Create src/ticker.ts**

```typescript
import { tick } from './state.ts'
import { getState, setState, broadcast } from './store.ts'

export function startTicker(): void {
  setInterval(() => {
    setState(tick(getState(), 0.1))
    broadcast()
  }, 100)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/store.ts src/ticker.ts
git commit -m "feat: add store singleton and 10Hz ticker"
```

---

### Task 4: Server app

**Files:**
- Create: `src/views/shared.html` (placeholder — full version in Chunk 3)
- Create: `src/views/player.html` (placeholder)
- Create: `src/views/dm.html` (placeholder)
- Create: `src/app.ts`
- Create: `src/index.ts`
- Create: `tests/server.test.ts`

- [ ] **Step 1: Create placeholder view files**

Create `src/views/shared.html`:
```html
<!DOCTYPE html><html><body><h1>Shared</h1></body></html>
```

Create `src/views/player.html`:
```html
<!DOCTYPE html><html><body><h1>Player</h1></body></html>
```

Create `src/views/dm.html`:
```html
<!DOCTYPE html><html><body><h1>DM</h1></body></html>
```

- [ ] **Step 2: Write the failing server tests**

Create `tests/server.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'bun:test'
import { app } from '../src/app'
import { resetState, getState } from '../src/store'

beforeEach(() => resetState())

describe('GET /', () => {
  it('returns HTML', async () => {
    const res = await app.handle(new Request('http://localhost/'))
    expect(res.status).toBe(200)
    const ct = res.headers.get('content-type') ?? ''
    expect(ct).toContain('text/html')
  })
})

describe('GET /dm', () => {
  it('returns HTML', async () => {
    const res = await app.handle(new Request('http://localhost/dm'))
    expect(res.status).toBe(200)
  })
})

describe('GET /:name', () => {
  it('returns HTML', async () => {
    const res = await app.handle(new Request('http://localhost/alice'))
    expect(res.status).toBe(200)
  })

  it('adds player to state on first visit', async () => {
    await app.handle(new Request('http://localhost/alice'))
    const state = getState()
    expect(state.entities.some(e => e.name === 'alice' && e.type === 'player')).toBe(true)
  })

  it('does not duplicate player on second visit', async () => {
    await app.handle(new Request('http://localhost/alice'))
    await app.handle(new Request('http://localhost/alice'))
    const state = getState()
    expect(state.entities.filter(e => e.name === 'alice')).toHaveLength(1)
  })

  it('reduces monster duration when player joins', async () => {
    const { addEntity: addEnt } = await import('../src/state')
    const { getState: gs, setState: ss } = await import('../src/store')
    ss(addEnt(gs(), 'Boss', 'monster'))

    await app.handle(new Request('http://localhost/alice'))
    const boss = getState().entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(14)
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `bun test tests/server.test.ts`
Expected: `error: Cannot find module '../src/app'`

- [ ] **Step 4: Create src/app.ts**

```typescript
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
```

- [ ] **Step 5: Create src/index.ts**

```typescript
import { app } from './app.ts'
import { startTicker } from './ticker.ts'

startTicker()
app.listen(3000, () => console.log('⚔ Pulse Combat running at http://localhost:3000'))
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `bun test tests/server.test.ts`
Expected: `6 tests passed`

- [ ] **Step 7: Run all tests**

Run: `bun test`
Expected: All tests pass (state + server).

- [ ] **Step 8: Commit**

```bash
git add src/app.ts src/index.ts src/views/
git commit -m "feat: add server with routes and WebSocket action dispatch"
```

---

## Chunk 3: Frontend Views

### Task 5: Shared view

**Files:**
- Modify: `src/views/shared.html`

- [ ] **Step 1: Replace with full shared view**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>⚔ Combat</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d0d; color: #ccc; font-family: system-ui, sans-serif; min-height: 100dvh; padding: 12px; }
    h1 { color: #a78bfa; font-size: 20px; text-align: center; margin-bottom: 12px; }
    .banner { display: none; background: #7f1d1d; color: #fca5a5; text-align: center; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-weight: bold; font-size: 15px; }
    .banner.visible { display: block; }
    .panel { background: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 12px; margin-bottom: 10px; }
    .panel-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 8px; }
    .bar-wrap { background: #222; border-radius: 6px; overflow: hidden; height: 12px; margin: 4px 0; }
    .bar { height: 100%; border-radius: 6px; transition: width 150ms linear; }
    .fate-bar { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
    .energy-bar { background: linear-gradient(90deg, #0369a1, #38bdf8); }
    .energy-bar.full { background: linear-gradient(90deg, #15803d, #4ade80); }
    .time-label { text-align: center; font-size: 11px; color: #666; margin-top: 3px; }
    .entity-name { font-size: 13px; color: #e2e8f0; margin-bottom: 4px; }
    .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 14px 0 6px; border-top: 1px solid #222; padding-top: 8px; }
    .join-form { display: flex; gap: 8px; margin-top: 16px; }
    .join-form input { flex: 1; background: #1a1a1a; border: 1px solid #333; color: #ccc; padding: 10px; border-radius: 8px; font-size: 14px; outline: none; }
    .join-form input:focus { border-color: #a78bfa; }
    .join-btn { background: #166534; color: #86efac; border: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div id="banner" class="banner">⚡ Timers Paused</div>
  <h1>⚔ Combat</h1>

  <div class="panel">
    <div class="panel-title">⚡ Fate Timer</div>
    <div class="bar-wrap"><div id="fate-bar" class="bar fate-bar" style="width:100%"></div></div>
    <div id="fate-time" class="time-label">30s</div>
  </div>

  <div id="monsters-section" style="display:none">
    <div class="section-label">Monsters</div>
    <div id="monsters-list"></div>
  </div>
  <div id="minions-section" style="display:none">
    <div class="section-label">Minions</div>
    <div id="minions-list"></div>
  </div>
  <div id="players-section" style="display:none">
    <div class="section-label">Players</div>
    <div id="players-list"></div>
  </div>

  <div class="join-form">
    <input id="name-input" type="text" placeholder="Your name..." autocomplete="off">
    <button class="join-btn" onclick="join()">Join</button>
  </div>

  <script>
    let ws, prevState = null, nextState = null, lastTick = 0
    function lerp(a, b, t) { return a + (b - a) * t }
    function lerpState(a, b, t) {
      if (!a) return b
      return {
        ...b,
        fate: { ...b.fate, current: lerp(a.fate.current, b.fate.current, t) },
        entities: b.entities.map((e, i) => {
          const ea = a.entities.find(x => x.id === e.id)
          if (!ea) return e
          return { ...e, timer: { ...e.timer, current: lerp(ea.timer.current, e.timer.current, t) } }
        })
      }
    }
    function connect() {
      ws = new WebSocket('ws://' + location.host + '/ws')
      ws.onmessage = e => {
        const m = JSON.parse(e.data)
        if (m.type === 'state') { prevState = nextState ?? m.data; nextState = m.data; lastTick = performance.now() }
      }
      ws.onclose = () => setTimeout(connect, 1000)
    }
    function animate() { if (nextState) { const alpha = Math.min(1, (performance.now() - lastTick) / 100); render(lerpState(prevState, nextState, alpha)) } requestAnimationFrame(animate) }
    requestAnimationFrame(animate)
    function fmt(s) { return Math.max(0, s).toFixed(1) + 's' }
    function pct(cur, dur) { return Math.min(100, (cur / dur) * 100) }

    function entityCard(e) {
      const p = pct(e.timer.current, e.timer.duration)
      return `<div class="panel">
        <div class="entity-name">${e.name}</div>
        <div class="bar-wrap"><div class="bar energy-bar ${p >= 100 ? 'full' : ''}" style="width:${p}%"></div></div>
        <div class="time-label">${fmt(e.timer.current)} / ${fmt(e.timer.duration)}</div>
      </div>`
    }

    function renderGroup(sectionId, listId, entities) {
      const sec = document.getElementById(sectionId)
      const list = document.getElementById(listId)
      if (!entities.length) { sec.style.display = 'none'; return }
      sec.style.display = ''
      list.innerHTML = entities.map(entityCard).join('')
    }

    function render(state) {
      document.getElementById('banner').classList.toggle('visible', state.fatePaused || state.dmPaused)
      const fp = pct(state.fate.current, state.fate.duration)
      document.getElementById('fate-bar').style.width = fp + '%'
      document.getElementById('fate-time').textContent = fmt(state.fate.current)
      renderGroup('monsters-section', 'monsters-list', state.entities.filter(e => e.type === 'monster'))
      renderGroup('minions-section', 'minions-list', state.entities.filter(e => e.type === 'minion'))
      renderGroup('players-section', 'players-list', state.entities.filter(e => e.type === 'player'))
    }

    function join() {
      const name = document.getElementById('name-input').value.trim()
      if (name) location.href = '/' + encodeURIComponent(name)
    }
    document.getElementById('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') join() })
    animate()
    connect()
  </script>
</body>
</html>
```

- [ ] **Step 2: Smoke test shared view**

Run: `bun run src/index.ts`
Open: `http://localhost:3000`
Verify: Dark background, fate bar visible, join form at bottom, no console errors.

- [ ] **Step 3: Commit**

```bash
git add src/views/shared.html
git commit -m "feat: implement shared spectator view"
```

---

### Task 6: Player view

**Files:**
- Modify: `src/views/player.html`

- [ ] **Step 1: Replace with full player view**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>⚔ Player</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d0d; color: #ccc; font-family: system-ui, sans-serif; min-height: 100dvh; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
    h1 { color: #a78bfa; font-size: 20px; text-align: center; }
    .banner { display: none; background: #7f1d1d; color: #fca5a5; text-align: center; padding: 12px; border-radius: 8px; font-weight: bold; font-size: 16px; }
    .banner.visible { display: block; }
    .panel { background: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 12px; }
    .panel-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 8px; }
    .bar-wrap { background: #222; border-radius: 8px; overflow: hidden; height: 16px; margin: 6px 0; cursor: pointer; }
    .bar { height: 100%; border-radius: 8px; transition: width 150ms linear; }
    .fate-bar { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
    .energy-bar { background: linear-gradient(90deg, #0369a1, #38bdf8); }
    .energy-bar.full { background: linear-gradient(90deg, #15803d, #4ade80); }
    .time-label { text-align: center; font-size: 12px; color: #666; margin-top: 3px; }
    .action-btn { width: 100%; padding: 20px; font-size: 18px; font-weight: bold; border: none; border-radius: 10px; cursor: pointer; margin-top: 10px; background: #1d4ed8; color: white; transition: opacity 200ms; }
    .action-btn:disabled { opacity: 0.3; cursor: default; }
    .sub-btns { display: flex; gap: 8px; margin-top: 8px; }
    .sub-btn { flex: 1; padding: 14px; font-size: 14px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; transition: opacity 200ms; }
    .sub-btn:disabled { opacity: 0.3; cursor: default; }
    .btn-bonus { background: #0f4c75; color: #7dd3fc; }
    .btn-react { background: #1e3a5f; color: #93c5fd; }
    .leave-btn { width: 100%; padding: 14px; font-size: 14px; font-weight: bold; border: none; border-radius: 10px; cursor: pointer; background: #7f1d1d; color: #fca5a5; margin-top: auto; }
  </style>
</head>
<body>
  <div id="banner" class="banner">⚡ Timers Paused</div>
  <h1 id="player-name">⚔</h1>

  <div class="panel">
    <div class="panel-title">⚡ Fate Timer</div>
    <div class="bar-wrap"><div id="fate-bar" class="bar fate-bar" style="width:100%"></div></div>
    <div id="fate-time" class="time-label">30s</div>
  </div>

  <div id="player-panel" class="panel" style="display:none">
    <div class="panel-title">Your Timer</div>
    <div class="bar-wrap" id="energy-wrap">
      <div id="energy-bar" class="bar energy-bar" style="width:0%"></div>
    </div>
    <div id="energy-time" class="time-label">0s / 15s</div>
    <button id="action-btn" class="action-btn" disabled onclick="sendAction('tap:action')">ACTION</button>
    <div class="sub-btns">
      <button id="bonus-btn" class="sub-btn btn-bonus" disabled onclick="sendAction('tap:bonus')">Bonus / Move</button>
      <button id="react-btn" class="sub-btn btn-react" disabled onclick="sendAction('tap:react')">React</button>
    </div>
  </div>

  <button class="leave-btn" onclick="leave()">Leave Combat</button>

  <script>
    const playerName = decodeURIComponent(location.pathname.slice(1))
    document.getElementById('player-name').textContent = '⚔ ' + playerName
    let ws, playerEntity = null, prevState = null, nextState = null, lastTick = 0
    function lerp(a, b, t) { return a + (b - a) * t }
    function lerpState(a, b, t) {
      if (!a) return b
      return {
        ...b,
        fate: { ...b.fate, current: lerp(a.fate.current, b.fate.current, t) },
        entities: b.entities.map(e => {
          const ea = a.entities.find(x => x.id === e.id)
          if (!ea) return e
          return { ...e, timer: { ...e.timer, current: lerp(ea.timer.current, e.timer.current, t) } }
        })
      }
    }
    function connect() {
      ws = new WebSocket('ws://' + location.host + '/ws')
      ws.onmessage = e => {
        const m = JSON.parse(e.data)
        if (m.type === 'state') { prevState = nextState ?? m.data; nextState = m.data; lastTick = performance.now() }
      }
      ws.onclose = () => setTimeout(connect, 1000)
    }
    function animate() { if (nextState) { const alpha = Math.min(1, (performance.now() - lastTick) / 100); render(lerpState(prevState, nextState, alpha)) } requestAnimationFrame(animate) }
    requestAnimationFrame(animate)
    function send(action) { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(action)) }
    function sendAction(type) { if (playerEntity) send({ type, id: playerEntity.id }) }
    function fmt(s) { return Math.max(0, s).toFixed(1) + 's' }
    function pct(cur, dur) { return Math.min(100, (cur / dur) * 100) }

    function render(state) {
      document.getElementById('banner').classList.toggle('visible', state.fatePaused || state.dmPaused)
      const fp = pct(state.fate.current, state.fate.duration)
      document.getElementById('fate-bar').style.width = fp + '%'
      document.getElementById('fate-time').textContent = fmt(state.fate.current)

      playerEntity = state.entities.find(e => e.name === playerName && e.type === 'player') ?? null
      const panel = document.getElementById('player-panel')

      if (playerEntity) {
        panel.style.display = ''
        const p = pct(playerEntity.timer.current, playerEntity.timer.duration)
        const bar = document.getElementById('energy-bar')
        bar.style.width = p + '%'
        bar.className = 'bar energy-bar' + (p >= 100 ? ' full' : '')
        document.getElementById('energy-time').textContent = fmt(playerEntity.timer.current) + ' / ' + fmt(playerEntity.timer.duration)
        document.getElementById('action-btn').disabled = p < 100
        document.getElementById('bonus-btn').disabled = p < 50
        document.getElementById('react-btn').disabled = p < 25
      } else {
        panel.style.display = 'none'
      }
    }

    function leave() {
      send({ type: 'player:leave', name: playerName })
      location.href = '/'
    }

    document.getElementById('energy-wrap').addEventListener('click', () => {
      if (playerEntity) send({ type: 'tap:energy', id: playerEntity.id })
    })
    connect()
  </script>
</body>
</html>
```

- [ ] **Step 2: Smoke test player view**

Run: `bun run src/index.ts`
Open: `http://localhost:3000/testplayer`
Verify: Player name in header, fate bar, energy panel with ACTION / Bonus / React buttons (greyed out), Leave Combat button. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/views/player.html
git commit -m "feat: implement player view with action buttons"
```

---

### Task 7: DM view

**Files:**
- Modify: `src/views/dm.html`

- [ ] **Step 1: Replace with full DM view**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚔ DM Control</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d0d; color: #ccc; font-family: system-ui, sans-serif; min-height: 100dvh; padding: 12px; }
    .banner { display: none; background: #7f1d1d; color: #fca5a5; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; font-weight: bold; font-size: 15px; align-items: center; justify-content: space-between; gap: 12px; }
    .banner.visible { display: flex; }
    .continue-btn { background: #dc2626; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; white-space: nowrap; }
    .top-bar { display: flex; align-items: center; gap: 8px; background: #111; border: 1px solid #333; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; flex-wrap: wrap; }
    .top-title { color: #a78bfa; font-weight: bold; font-size: 16px; margin-right: auto; }
    .top-btn { padding: 8px 16px; border: none; border-radius: 6px; font-size: 13px; font-weight: bold; cursor: pointer; }
    .btn-start { background: #166534; color: #86efac; }
    .btn-pause { background: #78350f; color: #fde68a; }
    .btn-reset { background: #3b0764; color: #d8b4fe; }
    .main { display: flex; flex-direction: column; gap: 12px; }
    @media (min-width: 640px) { .main { display: grid; grid-template-columns: 240px 1fr; gap: 16px; align-items: start; } }
    .left-col { display: flex; flex-direction: column; gap: 10px; }
    .panel { background: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 12px; }
    .panel-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 8px; }
    .dur-row { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #666; margin-bottom: 6px; }
    .dur-input { width: 50px; background: #111; border: 1px solid #333; color: #aaa; padding: 3px 6px; border-radius: 4px; font-size: 12px; text-align: center; }
    .bar-wrap { background: #222; border-radius: 6px; overflow: hidden; height: 12px; margin: 4px 0; cursor: pointer; }
    .bar { height: 100%; border-radius: 6px; transition: width 150ms linear; }
    .fate-bar { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
    .energy-bar { background: linear-gradient(90deg, #0369a1, #38bdf8); }
    .energy-bar.full { background: linear-gradient(90deg, #15803d, #4ade80); }
    .time-label { text-align: center; font-size: 11px; color: #666; margin-top: 3px; }
    .add-npc-input { width: 100%; background: #111; border: 1px solid #333; color: #ccc; padding: 8px; border-radius: 6px; font-size: 13px; margin-bottom: 8px; outline: none; }
    .add-npc-input:focus { border-color: #a78bfa; }
    .add-npc-btns { display: flex; gap: 6px; }
    .btn-monster { flex: 1; background: #1e3a5f; color: #93c5fd; border: none; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; }
    .btn-minion { flex: 1; background: #3b0764; color: #d8b4fe; border: none; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; }
    .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px; padding-bottom: 6px; border-bottom: 1px solid #222; }
    .entity-section { margin-bottom: 16px; }
    .entity-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
    .entity-card { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 10px; }
    .entity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .entity-name { color: #e2e8f0; font-size: 13px; font-weight: bold; }
    .remove-btn { color: #ef4444; font-size: 11px; cursor: pointer; background: none; border: none; padding: 0; }
    .action-btn { width: 100%; padding: 10px; font-size: 12px; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; margin-top: 6px; background: #1d4ed8; color: white; transition: opacity 200ms; }
    .action-btn:disabled { opacity: 0.3; cursor: default; }
    .sub-btns { display: flex; gap: 4px; margin-top: 4px; }
    .sub-btn { flex: 1; padding: 7px; font-size: 11px; font-weight: bold; border: none; border-radius: 5px; cursor: pointer; transition: opacity 200ms; }
    .sub-btn:disabled { opacity: 0.3; cursor: default; }
    .btn-bonus { background: #0f4c75; color: #7dd3fc; }
    .btn-react { background: #1e3a5f; color: #93c5fd; }
  </style>
</head>
<body>
  <div id="banner" class="banner">
    <span id="banner-text">⚡ Timers Paused</span>
    <button id="continue-btn" class="continue-btn" style="display:none" onclick="send({type:'dm:continue'})">▶ Continue</button>
  </div>

  <div class="top-bar">
    <span class="top-title">⚔ DM Control</span>
    <button class="top-btn btn-start" onclick="send({type:'dm:start'})">▶ Start</button>
    <button class="top-btn btn-pause" onclick="send({type:'dm:pause'})">⏸ Pause</button>
    <button class="top-btn btn-reset" onclick="confirmReset()">↺ Reset</button>
  </div>

  <div class="main">
    <div class="left-col">
      <div class="panel">
        <div class="panel-title">⚡ Fate Timer</div>
        <div class="dur-row">Duration: <input id="fate-dur" type="number" class="dur-input" value="30" min="1">s</div>
        <div class="bar-wrap" id="fate-bar-wrap">
          <div id="fate-bar" class="bar fate-bar" style="width:100%"></div>
        </div>
        <div id="fate-time" class="time-label">30s</div>
      </div>
      <div class="panel">
        <div class="panel-title">Add NPC</div>
        <input id="npc-name" type="text" class="add-npc-input" placeholder="NPC name...">
        <div class="add-npc-btns">
          <button class="btn-monster" onclick="addNPC('monster')">+ Monster</button>
          <button class="btn-minion" onclick="addNPC('minion')">+ Minion</button>
        </div>
      </div>
    </div>
    <div id="right-col"></div>
  </div>

  <script>
    let ws, lastEntitySig = '', prevState = null, nextState = null, lastTick = 0
    function lerp(a, b, t) { return a + (b - a) * t }
    function lerpState(a, b, t) {
      if (!a) return b
      return {
        ...b,
        fate: { ...b.fate, current: lerp(a.fate.current, b.fate.current, t) },
        entities: b.entities.map(e => {
          const ea = a.entities.find(x => x.id === e.id)
          if (!ea) return e
          return { ...e, timer: { ...e.timer, current: lerp(ea.timer.current, e.timer.current, t) } }
        })
      }
    }
    function connect() {
      ws = new WebSocket('ws://' + location.host + '/ws')
      ws.onmessage = e => {
        const m = JSON.parse(e.data)
        if (m.type === 'state') { prevState = nextState ?? m.data; nextState = m.data; lastTick = performance.now() }
      }
      ws.onclose = () => setTimeout(connect, 1000)
    }
    function animate() { if (nextState) { const alpha = Math.min(1, (performance.now() - lastTick) / 100); render(lerpState(prevState, nextState, alpha)) } requestAnimationFrame(animate) }
    requestAnimationFrame(animate)
    function send(action) { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(action)) }
    function fmt(s) { return Math.max(0, s).toFixed(1) + 's' }
    function pct(cur, dur) { return Math.min(100, (cur / dur) * 100) }
    function entitySig(entities) { return entities.map(e => e.id + ':' + e.timer.duration).join(',') }

    function entityCardHTML(e) {
      return `<div class="entity-card" id="card-${e.id}">
        <div class="entity-header">
          <span class="entity-name">${e.name}</span>
          <button class="remove-btn" onclick="send({type:'dm:removeNPC',id:'${e.id}'})">✕ remove</button>
        </div>
        <div class="dur-row">Dur: <input id="dur-${e.id}" type="number" class="dur-input" value="${e.timer.duration}" min="1">s</div>
        <div class="bar-wrap" onclick="send({type:'tap:energy',id:'${e.id}'})">
          <div id="bar-${e.id}" class="bar energy-bar" style="width:0%"></div>
        </div>
        <div id="time-${e.id}" class="time-label">0s</div>
        <button id="action-${e.id}" class="action-btn" disabled onclick="send({type:'tap:action',id:'${e.id}'})">ACTION</button>
        <div class="sub-btns">
          <button id="bonus-${e.id}" class="sub-btn btn-bonus" disabled onclick="send({type:'tap:bonus',id:'${e.id}'})">Bonus/Move</button>
          <button id="react-${e.id}" class="sub-btn btn-react" disabled onclick="send({type:'tap:react',id:'${e.id}'})">React</button>
        </div>
      </div>`
    }

    function groupHTML(label, entities) {
      if (!entities.length) return ''
      return `<div class="entity-section">
        <div class="section-label">${label}</div>
        <div class="entity-grid">${entities.map(entityCardHTML).join('')}</div>
      </div>`
    }

    function rebuildCards(entities) {
      document.getElementById('right-col').innerHTML =
        groupHTML('Monsters', entities.filter(e => e.type === 'monster')) +
        groupHTML('Minions', entities.filter(e => e.type === 'minion')) +
        groupHTML('Players', entities.filter(e => e.type === 'player'))
      entities.forEach(e => {
        const input = document.getElementById('dur-' + e.id)
        if (input) input.addEventListener('change', () => {
          const secs = parseInt(input.value)
          if (secs > 0) send({ type: 'dm:setEntityDuration', id: e.id, seconds: secs })
        })
      })
    }

    function updateCards(entities) {
      entities.forEach(e => {
        const p = pct(e.timer.current, e.timer.duration)
        const bar = document.getElementById('bar-' + e.id)
        if (bar) {
          bar.style.width = p + '%'
          bar.className = 'bar energy-bar' + (p >= 100 ? ' full' : '')
        }
        const timeEl = document.getElementById('time-' + e.id)
        if (timeEl) timeEl.textContent = fmt(e.timer.current) + ' / ' + fmt(e.timer.duration)
        const ab = document.getElementById('action-' + e.id); if (ab) ab.disabled = p < 100
        const bb = document.getElementById('bonus-' + e.id);  if (bb) bb.disabled = p < 50
        const rb = document.getElementById('react-' + e.id);  if (rb) rb.disabled = p < 25
      })
    }

    function render(state) {
      const paused = state.fatePaused || state.dmPaused
      const banner = document.getElementById('banner')
      banner.classList.toggle('visible', paused)
      if (paused) {
        document.getElementById('banner-text').textContent = state.fatePaused ? '⚡ Fate Timer Expired' : '⏸ Timers Paused'
        document.getElementById('continue-btn').style.display = state.fatePaused ? '' : 'none'
      }
      const fp = pct(state.fate.current, state.fate.duration)
      document.getElementById('fate-bar').style.width = fp + '%'
      document.getElementById('fate-time').textContent = fmt(state.fate.current)

      const sig = entitySig(state.entities)
      if (sig !== lastEntitySig) { rebuildCards(state.entities); lastEntitySig = sig }
      else { updateCards(state.entities) }
    }

    function addNPC(npcType) {
      const input = document.getElementById('npc-name')
      const name = input.value.trim()
      if (!name) return
      send({ type: 'dm:addNPC', name, npcType })
      input.value = ''
    }

    function confirmReset() {
      if (confirm('Reset all combat? This clears all NPCs and players.')) send({ type: 'dm:reset' })
    }

    document.getElementById('fate-dur').addEventListener('change', e => {
      const secs = parseInt(e.target.value)
      if (secs > 0) send({ type: 'dm:setFateDuration', seconds: secs })
    })
    document.getElementById('fate-bar-wrap').addEventListener('click', () => send({ type: 'tap:fate' }))
    document.getElementById('npc-name').addEventListener('keydown', e => { if (e.key === 'Enter') addNPC('monster') })
    connect()
  </script>
</body>
</html>
```

- [ ] **Step 2: Smoke test DM view**

Run: `bun run src/index.ts`
Open: `http://localhost:3000/dm`
Verify: Top bar with Start/Pause/Reset, fate panel on left, Add NPC form, entity grid area on right. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/views/dm.html
git commit -m "feat: implement DM view with responsive grid layout"
```

---

### Task 8: Final integration smoke test

- [ ] **Step 1: Run all tests**

Run: `bun test`
Expected: All tests pass.

- [ ] **Step 2: Full integration walkthrough**

Run: `bun run src/index.ts`

Open three browser windows:
1. `http://localhost:3000/dm` (DM)
2. `http://localhost:3000/alice` (Player)
3. `http://localhost:3000/` (Spectator)

Verify in order:
- [ ] Player "alice" appears in DM view and Shared view immediately
- [ ] Alice's monster duration in DM view decremented by 1 (if monsters exist)
- [ ] DM presses Start → all bars begin animating on all windows simultaneously
- [ ] Fate bar counts down on all windows
- [ ] Alice's energy bar counts up on all windows
- [ ] Alice presses ACTION (wait for full) → energy drains to 0, visible on all windows
- [ ] Fate bar reaches 0 → all bars freeze, red banner appears on all windows, Continue button appears in DM view
- [ ] DM presses Continue → fate refills, timers resume, banner disappears on all windows
- [ ] DM presses Pause → banner appears on all windows (no Continue button)
- [ ] DM presses Reset (confirm) → all entities cleared, fate reset
- [ ] Alice presses Leave → redirected to `/`, alice removed from DM view

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: pulse combat timer — complete implementation"
```
