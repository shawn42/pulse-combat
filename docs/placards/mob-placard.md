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

## To discuss (open design tensions)

- **Save resolution mechanic** — fixed/passive (`10+mod`) vs. pre-rolled batch vs. a live respin-on-use value (app-driven: a value sits visible until that save is actually invoked, then randomizes for next time). Currently the card just prints the modifier regardless of which way this goes, but the choice affects whether a companion app feature is needed.
- **Minion Overkill "adjacency" on a gridless table** — the Flee, Mortals! (MCDM) minion rules this system uses key the cleave/overkill mechanic to the target's *adjacent* minion, which assumes a grid. Pulse plays gridless with tactile minis, so "adjacent" needs its own definition — nearest mini, or any minion in the same DM-grouped batch? See `pulse_combat_system_overview.md` → Minions.

## Deferred to future artifacts

- **Group-save shortcut for identical minions** (e.g. "×6 goblins, one save roll for all") — future artifact, not this pass.
- **Loot cards** — face-down cards tossed on a monster's death, from the original system design (looting interrupts combat for that player). Future artifact; flagged as potentially useful if prebuilt encounters are ever compiled/sold for Pulse Combat.
- **DM stat block / cheatsheet** — now underway at `dm-placard.md`, covering LR tracking, energy N, full attack/action text, and other DM-only tactical info.
- **Hidden Resist/Vuln/Immune, revealed on discovery** — should the card's Resist/Vuln/Immune line start covered (e.g. a sliding tab or sticker) and only get revealed the first time the party actually triggers that damage type or condition against the mob? Same "don't let players metagame the stat block" motivation as hiding LR uses, just applied to resistances too. Not designed, no mechanism chosen — flagged for later.

## Reference monster validation

- Mocked up against a real stat block: Goblin Boss, 2024 Monster Manual (XMM) — via 5e.tools, including official art.
