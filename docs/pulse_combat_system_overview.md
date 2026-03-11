# Chaos Pulse Combat System Overview

A real-time combat variant for D&D 5e that replaces turn-based initiative with simultaneous energy bars and a DM-controlled Fate Timer. All participants act in real time as their energy allows.

---

## Core Concept

Every participant — player characters and non-minion enemies — has an **energy bar** that fills continuously over N seconds. When enough energy has accumulated, the player or DM can spend it to take an action. There are no turns; everyone acts simultaneously.

---

## Energy Bars & Timer Duration

| Entity Type | Base Duration (N) | Scaling |
|---|---|---|
| Player Character | 15s | DEX modifier (see below) |
| Monster / Boss | max(10s, 15s − # of PCs) | Scales down as party grows |
| Minion | 15s | No scaling |

### Player DEX Scaling

PC timer duration is reduced by DEX modifier:

- −1s per +2 Dex modifier
- Maximum reduction: −3s (minimum 12s for a high-DEX PC)

*The app fixes all players at 15s by default. Players should set their own duration to reflect their DEX modifier using the DM panel.*

### Monster Scaling

Monster timers shrink as more players join (more pressure = faster monsters), flooring at 10s regardless of party size. Minion timers are unaffected by party size.

---

## Actions

| Action | Energy Cost | Notes |
|---|---|---|
| Full Action | 100% | Attack, cast a spell, use a feature |
| Move / Bonus Action | 50% | Move, bonus action, object interaction |
| Reaction | 25% | Counterspell, opportunity attack, shield |

After spending energy the bar resets and begins refilling immediately.

---

## The Fate Timer

Every **30 seconds** (2× base N), all energy bars pause. This is the **Fate window** — the DM's moment to act:

- Narrate, move NPCs, describe the environment
- Add new waves of enemies (they enter with **full energy** and act immediately on resume)
- Resolve death saves (death saves only occur during Fate pauses)
- Use lair actions or legendary actions

When the DM taps **Continue**, the Fate bar refills and all timers resume. An audible chime signals the Fate pause to all players.

---

## Legendary Resistance

Non-minion enemies may have Legendary Resistance (LR) uses, determined by CR:

> **LR uses = floor(CR ÷ 3)**

| CR | LR Uses |
|---|---|
| 1–2 | 0 |
| 3–5 | 1 |
| 6–8 | 2 |
| 9–11 | 3 |

**Each LR use costs 50% of the current energy bar.** This prevents control spells from instantly removing a boss without rewriting spell mechanics. The DM triggers LR by tapping the Bonus action button on an NPC's timer.

---

## Spells & Duration

The core rule: **"until the end of your next turn" becomes "until the next Fate pause."**

| Spell Type | Handling |
|---|---|
| Damage spells | Play as written |
| Control spells (Hold Person, Banishment, etc.) | Last until next Fate pause; single save on initial effect; LR can negate |
| Concentration buffs/debuffs | Last until next Fate pause or concentration ends |
| Counterspell | One success stops the spell; all casters who attempted spend a token |
| Healing | Works normally |
| Spells with per-turn effects | Scale to Fate duration (1 round ≈ 1 Fate cycle) |

Spell tokens physically limit per-encounter uses and track ongoing effects (e.g. flip a Hold Person token to show Paralyzed).

---

## Minions

Minions are fast to run and fast to die:

- Low HP (5–10), rollover damage applies
- 15s energy timer, unaffected by party size
- No Legendary Resistance
- Tracked with HP beads; DM removes beads as damage lands

---

## Health Tracking

Physical bead counters work well at the table:

- **Players:** beads in a small bowl; remove on damage
- **Minions:** small counters, 1–2 PC hits kills
- **Boss:** large bead counter (100–250 for high-CR encounters)

---

## Scaling Reference

### Level 2 Party (4 PCs → monster N = 11s)

| Enemy | HP | CR | N | LR |
|---|---|---|---|---|
| Lieutenant | 30–40 | ½–1 | 11s | 0 |
| Boss | 90–100 | 2 | 12s | 0 |
| Minions | 5 | ½ | 15s | 0 |

### Level 8 Party (4 PCs → monster N = 11s)

| Enemy | HP | CR | N | LR |
|---|---|---|---|---|
| Lieutenant | 80 | 4 | 11s | 1 |
| Boss | 250 | 8 | 12s | 2 |
| Minions | 10 | ½ | 15s | 0 |

---

## DM Workflow

1. Set Fate timer duration and NPC durations before starting
2. Hit **Start** — all timers begin filling
3. Players act as their energy allows; DM taps NPC actions as timers fill
4. When Fate fires, add new enemies, narrate, resolve death saves
5. Hit **Continue** to resume — any NPCs just added enter with full energy
6. Apply LR (Bonus action tap) when a control spell would otherwise lock out a boss
7. Adjust NPC HP and timer duration mid-encounter if needed to maintain tension

---

## Sample NPC Stat Blocks

### Lieutenant (CR 4)
- HP: 80 | AC: 16 | Speed: 30 ft
- Attack: Longsword +7, 1d8+4 slashing
- LR: 1 use | N: 11s
- Tactic: focused attacks on one PC

### Boss (CR 8)
- HP: 250 | AC: 17 | Speed: 30 ft
- Attack: Greatsword +9, 2d6+5 slashing; Multiattack ×2
- Optional: Fireball 6d6 (15 ft cone, recharge 3 Fate cycles)
- LR: 2 uses | N: 12s

### Minion
- HP: 10 | AC: 13 | Speed: 30 ft
- Attack: Shortsword +3, 1d6+1
- N: 15s | No LR
