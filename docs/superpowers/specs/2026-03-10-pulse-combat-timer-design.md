# Pulse Combat Timer — Design Spec

**Date:** 2026-03-10
**Status:** Approved

---

## Overview

A local-WiFi web app supporting the Pulse Combat System for D&D 5e. The DM runs a server on their machine; players and spectators connect via browser. All timers stay perfectly synchronized across devices in real time.

---

## Stack

| Concern | Decision |
|---|---|
| Runtime | Bun + Elysia |
| State | In-memory, ephemeral (lost on restart) |
| Real-time sync | Server-authoritative, WebSocket broadcast at 10Hz |
| Frontend | Vanilla HTML/CSS/JS, served inline — no build step |
| Animation | `requestAnimationFrame` interpolation between ticks |

---

## Data Model

```typescript
type CombatState = {
  running: boolean       // are timers ticking?
  dmPaused: boolean      // DM manually paused
  fatePaused: boolean    // fate timer hit 0, waiting for Continue
  fate: {
    duration: number     // seconds, default 30, DM-configurable
    current: number      // counts DOWN from duration to 0
  }
  entities: Entity[]
}

type Entity = {
  id: string
  name: string
  type: 'player' | 'monster' | 'minion'
  timer: {
    duration: number     // seconds, default 15, DM-configurable
    current: number      // counts UP from 0 to duration
  }
}
```

**State mutation rules:**
- Player joins (`GET /:name`) → entity added with `type: 'player'`; all `monster` entities' `duration -= 1`
- Player leaves → entity removed; all `monster` entities' `duration += 1`
- Minions are unaffected by player count changes
- Fate hits 0 → `fatePaused = true`, all timers freeze, banner shown on all views
- DM presses Continue → fate refilled, `fatePaused = false`, timers resume

---

## Server Structure

```
claude-pulse/
├── src/
│   ├── index.ts          # Elysia app, HTTP routes, WebSocket handler
│   ├── state.ts          # CombatState, all mutation functions
│   ├── ticker.ts         # 10Hz setInterval → broadcasts state to all WS clients
│   └── views/
│       ├── dm.html       # DM view
│       ├── player.html   # Player view
│       └── shared.html   # Shared/spectator view
├── package.json
└── bun.lockb
```

---

## Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Shared view |
| `GET` | `/dm` | DM view |
| `GET` | `/:name` | Player view — auto-joins combat on first visit |
| `WS` | `/ws` | WebSocket endpoint — all clients connect here |

---

## WebSocket Protocol

### Server → all clients (10Hz)
```json
{ "type": "state", "data": CombatState }
```

### Client → server (actions)
```
dm:start
dm:pause
dm:reset                          — clears all entities, resets fate
dm:continue                       — refill fate, clear fatePaused, resume
dm:addNPC      { name, npcType: "monster" | "minion" }
dm:removeNPC   { id }
dm:setFateDuration     { seconds }
dm:setEntityDuration   { id, seconds }
tap:fate                          — toggle fate bar full/empty
tap:energy     { id }             — toggle entity bar full/empty
tap:action     { id }             — requires 100% energy; sets to 0
tap:bonus      { id }             — requires ≥50% energy; removes 50%
tap:react      { id }             — requires ≥25% energy; removes 25%
player:leave   { name }           — remove player, redirect to /
```

---

## Views

### DM View (`/dm`) — Laptop-optimized
- **Top bar:** title + Start / Pause / Reset buttons
- **Left column (240px):** Fate timer panel (duration input + animated bar) + Add NPC form
- **Right column:** Entity cards in a CSS `auto-fill` grid, grouped by Monsters / Minions / Players
- Each entity card: name, duration input, energy bar, Action / Bonus+Move / React buttons, remove link
- Responsive: collapses to single column on mobile

### Player View (`/:name`) — Mobile-first, single screen
- Read-only Fate timer
- Single Player Panel (full-size buttons for easy tapping)
- Leave Combat button (red, prominent)
- Pause banner when `dmPaused || fatePaused`

### Shared View (`/`) — Spectator
- Read-only Fate timer
- Thin read-only entity cards for all entities, grouped by Monsters / Minions / Players
- Join form at bottom (name input + Join button → redirects to `/:name`)
- Pause banner when `dmPaused || fatePaused`

---

## Real-time Tick Loop

Every 100ms (10Hz), the server:
1. If `running && !fatePaused && !dmPaused`:
   - Decrements `fate.current` by 0.1s
   - Increments each entity's `timer.current` by 0.1s (capped at `duration`)
2. Checks if `fate.current <= 0` → sets `fatePaused = true`
3. Broadcasts full `CombatState` to all connected WebSocket clients

Clients receive state updates and use `requestAnimationFrame` to interpolate bar widths smoothly between ticks, achieving 60fps animation from 10Hz data.

---

## Edge Cases

- **Invalid tap actions** (e.g. `tap:action` when energy < 100%) — server silently ignores; clients disable buttons visually so this shouldn't happen
- **Duplicate player name** — if `/:name` is visited and a player with that name already exists, treat it as a rejoin (no duplicate added, no duration change)
- **`player:leave` trust** — local WiFi only, no auth; server trusts the name provided
- **Floating-point tick drift** — fate and entity timers use `<= 0` / `>= duration` checks to handle float accumulation; values are clamped after each tick
- **Route ordering** — `/:name` must be registered after all specific routes (`/`, `/dm`) in Elysia to avoid catch-all conflicts

---

## Styling

- Dark theme throughout (`#0d0d0d` background)
- Oversized buttons for mobile tapping
- Animated energy bars (CSS transitions + rAF interpolation)
- Fate timer: purple gradient bar
- Entity energy bars: blue → green when full
- Pause banner: red, full-width, shown on all views simultaneously
