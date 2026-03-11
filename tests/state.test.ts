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

  it('monster added before combat starts with current = 0', () => {
    const s = addEntity(createInitialState(), 'Goblin', 'monster')
    expect(s.entities[0].timer.current).toBe(0)
  })

  it('monster added after combat starts with current = duration', () => {
    const s = addEntity(dmStart(createInitialState()), 'Goblin', 'monster')
    expect(s.entities[0].timer.current).toBe(s.entities[0].timer.duration)
  })

  it('monster added when players present starts with duration 15 - playerCount', () => {
    let s = addEntity(createInitialState(), 'Alice', 'player')
    s = addEntity(s, 'Bob', 'player')
    s = addEntity(s, 'Boss', 'monster')
    const boss = s.entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(13)
  })

  it('monster duration floors at 10 with 6+ players', () => {
    let s = createInitialState()
    for (const name of ['A','B','C','D','E','F']) s = addEntity(s, name, 'player')
    s = addEntity(s, 'Boss', 'monster')
    const boss = s.entities.find(e => e.name === 'Boss')!
    expect(boss.timer.duration).toBe(10)
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
