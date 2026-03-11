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

export function addEntity(
  state: CombatState,
  name: string,
  type: EntityType,
  id: string = crypto.randomUUID()
): CombatState {
  if (type === 'player' && state.entities.some(e => e.name === name && e.type === 'player')) {
    return state
  }
  const playerCount = state.entities.filter(e => e.type === 'player').length
  const duration = type === 'monster' ? Math.max(1, 15 - playerCount) : 15
  let entities = [...state.entities, { id, name, type, timer: { duration, current: 0 } }]
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
      e.id === id ? { ...e, timer: { duration: seconds, current: Math.min(e.timer.current, seconds) } } : e
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
