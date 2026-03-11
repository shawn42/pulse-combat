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
