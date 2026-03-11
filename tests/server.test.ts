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

describe('GET /player/:name', () => {
  it('returns HTML', async () => {
    const res = await app.handle(new Request('http://localhost/player/alice'))
    expect(res.status).toBe(200)
  })

  it('adds player to state on first visit', async () => {
    await app.handle(new Request('http://localhost/player/alice'))
    const state = getState()
    expect(state.entities.some(e => e.name === 'alice' && e.type === 'player')).toBe(true)
  })

  it('does not duplicate player on second visit', async () => {
    await app.handle(new Request('http://localhost/player/alice'))
    await app.handle(new Request('http://localhost/player/alice'))
    const state = getState()
    expect(state.entities.filter(e => e.name === 'alice')).toHaveLength(1)
  })

  it('reduces monster duration when player joins', async () => {
    const { addEntity: addEnt } = await import('../src/state')
    const { getState: gs, setState: ss } = await import('../src/store')
    ss(addEnt(gs(), 'Boss', 'monster'))

    await app.handle(new Request('http://localhost/player/alice'))
    const boss = getState().entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(14)
  })
})
