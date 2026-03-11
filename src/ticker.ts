import { tick } from './state.ts'
import { getState, setState, broadcast } from './store.ts'

export function startTicker(): void {
  setInterval(() => {
    setState(tick(getState(), 0.1))
    broadcast()
  }, 100)
}
