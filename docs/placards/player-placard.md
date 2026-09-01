# Player Placard — Living Design Outline

**Status:** living outline for iteration, not frozen. Source docs: `docs/superpowers/specs/2026-08-18-player-mat-design.md` (original requirements pass) and `docs/archive/chaos_pulse_conversation_export.md` (full system design history).

## Purpose

- Speed up the parts of combat the app doesn't handle: a player's own attack/spell numbers, AC, saves, spell slots, HP.
- Sits on the table next to the player's device running the timer app.

## Confirmed contents

- Character name
- Precomputed attack bonus + spellcasting numbers — the character's actual computed values, not formula reminders
- Spell save DC
- AC + all 6 saving throw bonuses (proficient ones marked)
- Spell slot tracker — one chip per slot, by level
  - Multiclass casters may need multiple labeled pools with different recovery rules (e.g. Sorcerer long-rest slots vs. Warlock short-rest Pact Magic) — confirmed real case, not anticipated in the original spec. See "Reference character validation" below.
- Max HP as a printed numbered track (1 to max) directly on the mat, with a sliding marker/clip tracking current HP — no separate bead bowl (superseded 2026-09-01, see Decisions log)
- Precomputed energy timer duration (DEX-adjusted)

## Explicitly excluded / not tracked

- **Target AC / "need to roll" field** — cut. Breaks down against mixed-AC mobs; recalculating a per-target "need" number mid-fight is slower than just doing the one subtraction when it's actually needed.
- **Exhaustion** — dropped entirely, not tracked on the mat.
- **Death saves** — still an open question (see To Discuss).

## Shared component usage

Condition token bin (shared with the mob placard) now covers:

- Standard conditions (Prone, Poisoned, Paralyzed, etc.)
- Concentration — interim solution, no dedicated marker
- Advantage/disadvantage — interim solution, generic chip, may not be expressive enough long-term

Not covered by the shared bin: **exhaustion** — dropped, no tracking mechanism at all.

## Decisions log

- 2026-08-19 — No Target-AC field. Mixed-AC mobs make a single precomputed field useless.
- 2026-08-19 — Concentration tracked via the shared condition bin, no dedicated marker.
- 2026-08-19 — Exhaustion dropped from scope entirely.
- 2026-08-19 — Advantage/disadvantage tracked via an interim generic condition chip.
- 2026-09-01 — **Reverses the 2026-08-19 bead-bowl call.** Current HP moves onto the mat as a printed track with a sliding marker, instead of a separate bead bowl. Reasoning: mobs already use a loose bead bin players grab from directly ("hungry hungry hippos" style, self-service, trusted) and that works fine for mobs — but a personal loose bin didn't feel right for a player's own HP, and bowls/dials/dice/paper alternatives are all *private* numbers nobody else at the table can read at a glance. A printed track keeps the "visible position, no arithmetic beyond one subtraction" property of beads without a spillable bin. Marked "for now" — not yet physically prototyped (does a slider stay put on a card during actual play?), worth a live-test pass. See `pulse_combat_live_test_questions.md`.

## To discuss (open design tensions)

- **Spell resource model** — is chip-per-slot-by-level final, or do problem spells (Fireball, Hold Person) still need a spell-specific token layered on top? User remains unconvinced about abandoning spell-specific tokens entirely.
- **Counterspell token** — reaction energy + token; if multiple players counterspell the same spell, everyone who attempted loses their token even if only one succeeds. Rule is already fully specified in the original system design — currently out of scope, worth reconsidering.
- **Sneak Attack tokens** — "give them tokens like we do for spells," from original design. No home yet.
- **Flip tokens** — a spell token flips to show its resulting condition (e.g. Hold Person → Paralyzed). Possibly superseded by the generic condition bin now that spell tokens are out of scope.
- **Advantage/disadvantage chip expressiveness** — is a plain condition chip enough, or does source/duration need tracking?
- **Death saves** — track on the mat, track elsewhere (Fate-pause-only per original design), or skip entirely?
- **Non-spell combat maneuvers** (push/shove, grapple, opportunity attacks, etc.) — none of these have been mapped to Pulse's energy/action-cost model yet. Same open question as Sneak Attack's "once per turn": what does a 5e turn-scoped limit or trigger (e.g. one opportunity attack per triggering movement, grapple contests, shove-as-attack-substitute) become when there are no turns? Not yet evaluated.

## Deferred to future artifacts

- None currently specific to this placard.

## Reference character validation

- Mocked up against a real character: Arvin (Autognome Warlock 5 / Sorcerer 1) — https://www.dndbeyond.com/characters/165658548
- This surfaced the multiclass two-pool spell slot edge case (Sorcerer long-rest slots vs. Warlock short-rest Pact Magic slots) as a genuine, previously-unanticipated case for the chip-track design.
- Also the first placard built after the 2026-09-01 HP-track decision — below, showing the track + paperclip in place of the bead bowl.

```
┌────────────────────────────────────────────────┐
│  ARVIN                                          │
│  Autognome — Warlock 5 (Fathomless) /           │
│                      Sorcerer 1 (Storm Sorcery) │
├────────────────────────────────────────────────┤
│  AC 16               Energy Timer: 14s          │
│                        (15s − 1s, DEX +3)       │
├────────────────────────────────────────────────┤
│  HP TRACK  (paperclip slider, 1–44)             │
│   1    5   10   15   20   25   30   35   40  44 │
│   •----•----•----•----•----•----•----•----•--🖇 │
│                               clip at: 44 (full)│
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR -1       DEX +3        CON +2             │
│   INT  0       WIS ● +3      CHA ● +6           │
│   (CHA save: +6 further vs. paralyzed/poisoned) │
├────────────────────────────────────────────────┤
│  SPELLCASTING                                   │
│   Warlock ....... Save DC 14    Attack ..... +6 │
│   Sorcerer ....... Save DC 15    Attack ..... +6│
│   Tentacle of the Deeps (10ft reach) ........+6 │
├────────────────────────────────────────────────┤
│  SPELL SLOTS                                    │
│   Sorcerer (long rest)                          │
│     1st  [●] [●]                                │
│   Warlock — Pact Magic (short rest)             │
│     3rd  [●] [●]                                │
└────────────────────────────────────────────────┘
```

Note the two separate Spell Save DCs (Warlock 14, Sorcerer 15) — a second real multiclass edge case this placard has to handle beyond just the two-pool slot tracker: a caster whose two classes derive different DCs, not just different slot pools.
