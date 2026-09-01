# Mob Placard — Living Design Outline

**Status:** living outline for iteration, not frozen. Source docs: `docs/superpowers/specs/2026-08-18-monster-card-design.md` (original requirements pass) and `docs/archive/chaos_pulse_conversation_export.md` (full system design history).

## Purpose

- Player-facing only. Gives players table-visible info about an enemy so they can make tactical calls without interrupting the DM.
- Not a DM stat block — the DM's own full reference is a separate, not-yet-started future doc.
- As an initial pass, this same card is good enough to double as a rough DM reference too, but that's not its design target.

## Scope

- One universal template covers all three enemy tiers — Boss, Lieutenant, and Minion. Simpler enemies (minions) just leave fields blank rather than needing a distinct template.

## Confirmed contents

- Name/type + portrait/art area
- AC
- Saving throw bonuses (all 6) — raw modifier only, no precomputed passive-save value
- Resistances / Vulnerabilities / Immunities — low priority, often left blank
- Max HP printed — current HP via a separate, visible bead pool

## Explicitly excluded / not tracked

- **Legendary Resistance uses** — stays hidden/DM-only. Revealing remaining LR would let players play around it, undercutting its purpose.
- **Attack info** (weapon, damage type, reach/range) — DM-narrated in the moment, not pre-printed.
- **Bloodied/enrage threshold** — no printed line. DM eyeballs remaining beads and drops a condition token on the mob at the next Fate pause if warranted.
- **Conditions** — no dedicated card zone, shared token bin.

## Shared component usage

- Condition token bin (shared with the player placard).

## Decisions log

- 2026-08-19 — Save line prints raw modifier only, not a precomputed passive-save value.
- 2026-08-19 — No bloodied/enrage threshold printed — DM eyeballs beads instead.
- 2026-08-19 — Legendary Resistance uses, party-size-adjusted enemy energy rate, and minion rollover damage all stay rules-only — none of them need a printed table artifact.
- 2026-09-01 — **Save resolution mechanic locked in: fixed/passive (`10 + mod`), for now.** Chosen over pre-rolled batch (adds session prep) and a live-respin app feature (needs new app work, and raises its own question about whether the value should be player-visible) because it costs zero additional build work and is the fastest option for batch-resolving several simultaneous mob saves at once. Doesn't conflict with the 2026-08-19 call to print the raw modifier rather than a precomputed number — that was about what's printed, this is about how the save gets resolved when needed. Caveat: this trades away randomness on the monster side of saves (a given mob will always pass or fail against a fixed DC), which may read as too deterministic at the table — **flagged for reassessment after a real playtest**, see `pulse_combat_live_test_questions.md`.

## To discuss (open design tensions)

- **Minion Overkill "adjacency" on a gridless table** — the Flee, Mortals! (MCDM) minion rules this system uses key the cleave/overkill mechanic to the target's *adjacent* minion, which assumes a grid. Pulse plays gridless with tactile minis, so "adjacent" needs its own definition — nearest mini, or any minion in the same DM-grouped batch? See `pulse_combat_system_overview.md` → Minions.

## Deferred to future artifacts

- **Group-save shortcut for identical minions** (e.g. "×6 goblins, one save roll for all") — future artifact, not this pass.
- **Loot cards** — face-down cards tossed on a monster's death, from the original system design (looting interrupts combat for that player). Future artifact; flagged as potentially useful if prebuilt encounters are ever compiled/sold for Pulse Combat.
- **DM stat block / cheatsheet** — now underway at `dm-placard.md`, covering LR tracking, energy N, full attack/action text, and other DM-only tactical info.
- **Hidden Resist/Vuln/Immune, revealed on discovery** — should the card's Resist/Vuln/Immune line start covered (e.g. a sliding tab or sticker) and only get revealed the first time the party actually triggers that damage type or condition against the mob? Same "don't let players metagame the stat block" motivation as hiding LR uses, just applied to resistances too. Not designed, no mechanism chosen — flagged for later.

## Reference monster validation

- Mocked up against a real stat block: Goblin Boss, 2024 Monster Manual (XMM) — via 5e.tools, including official art.
- Mocked up against the Rat King encounter trio (Boss/Lieutenant/Minion), the same three monsters used for `dm-placard.md`'s DM-facing cards and the playtest build list — first time all three tiers of the universal template got built as public-facing cards together:

```
┌────────────────────────────────────────────────┐
│  ┌──────────┐  RAT KING                         │
│  │  [ art ] │  Large Aberration — CR 8           │
│  └──────────┘                                   │
├────────────────────────────────────────────────┤
│  AC 17                Max HP 170                │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR +5       DEX -1        CON +3             │
│   INT +2       WIS +2        CHA +5             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   Immune: Charmed, Frightened                   │
└────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────┐
│  ┌──────────┐  WERERAT LORD                     │
│  │  [ art ] │  Large Humanoid (shapechanger)    │
│  └──────────┘  CR 5                             │
├────────────────────────────────────────────────┤
│  AC 13                Max HP 44                 │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR +3       DEX +3        CON +1             │
│   INT +1       WIS +1        CHA  0             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   (none listed in source stat block)            │
└────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────┐
│  ┌──────────┐  GIANT RAT  (minion)              │
│  │  [ art ] │  Small Beast — CR 1/8              │
│  └──────────┘                                    │
├────────────────────────────────────────────────┤
│  AC 13                Max HP 7                  │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR -2       DEX ● +5      CON  0             │
│   INT -4       WIS  0        CHA -3             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   (none)                                        │
└────────────────────────────────────────────────┘
```

  One Giant Rat card is enough — all copies on the table are identical, so build one template and print/photocopy as many as minis are in play (see the playtest build list for the actual minion count decision).
