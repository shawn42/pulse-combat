# Player Mat — Design Doc

**Status:** Content/requirements only. Layout and visual design are a follow-up pass.

## Purpose

Pulse Combat's app already owns the things that need real-time precision: energy bars, action timers, and Fate pauses. Everything else a player needs mid-combat — their own attack/spell numbers, AC, saves, spell slots, HP — currently lives nowhere but the player's memory or a phone app (D&D Beyond, a PDF character sheet) they have to tab away to.

The player mat exists to speed up **the parts of play the app deliberately doesn't handle**, so players aren't doing math or breaking pace to look something up mid-combat. It sits on the table next to the player's device running the app.

## Contents

1. **Character identity** — name, so mats are distinguishable at a glance.

2. **Pre-calculated attack & spellcasting numbers.** Not formula reminders ("d20 + prof + mod") — the character's *actual* computed bonuses (attack bonus vs. AC, spell save DC, damage dice for signature attacks/spells). The math gets done once, at fill-in time, not repeatedly at the table.

3. **AC + all 6 saving throw bonuses.** Printed as a static reference. Saving throws matter beyond the player's own turn — area spells and effects target them constantly, and having them on hand avoids a mid-combat lookup.

4. **Spell slot tracker.** One chip-slot per spell level (1st–9th, as applicable to the character), matching the standard 5e slot table shape. A chip sits in each open slot; the player removes one on cast. This is the primary "physical trackers speed up play" mechanic for casters.

5. **Max HP** — printed as a single number. Current HP is *not* tracked on the mat; it's tracked in a separate physical bead bowl (per the existing rules overview: players keep beads in a small bowl and remove on damage). The mat's job is just to record the static max value for reference.

6. **Pre-calculated energy timer duration.** The rules system reduces a PC's app timer duration based on DEX modifier (−1s per +2 DEX mod, capped at −3s). The app defaults every player to 15s and expects them to self-adjust. Printing the character's already-computed duration (e.g. "Your timer: 13s") turns that into a one-time lookup instead of mental math, and reduces setup mistakes.

## Explicitly excluded from this pass

- **Death saves tracker** (3 success / 3 failure boxes). Death saves are called out in the rules overview as a Fate-pause-only event and aren't tracked by the app. Left off the mat for now — **open question**, revisit before layout.
- **Per-encounter spell tokens.** The rules overview separately describes tokens that limit per-encounter special uses (e.g. Counterspell attempts) and flip to show ongoing effects (e.g. a Hold Person token flipped to show Paralyzed). This is distinct from spell-slot chips (#4 above) and is out of scope for this pass.
- **Conditions.** No dedicated zone on the mat. See Shared Components below.
- **Layout, sizing, and visual design.** Deferred to a later pass, once content is settled for both this doc and the monster card doc.

## Production

For this pass: a single blank template, hand-filled with pen. Each player computes their own numbers once and writes them in; the same physical mat gets reused session to session.

**Future revision:** auto-generate a pre-filled version from a D&D Beyond character link, eliminating manual math and transcription errors entirely. Not in scope now — the blank template is the starting point.

## Shared components (not owned by this doc)

**Condition tokens.** A shared bin of physical tokens (one per condition type — Prone, Poisoned, Paralyzed, etc.) that any player or the DM can grab from and drop directly onto a mat or monster card to mark an active condition. This is a cross-cutting prop used by both the player mat and the monster card (see `2026-08-18-monster-card-design.md`) — it is not a printed zone on either artifact, just a dependency both reference. No dedicated design work for it in this pass.

## Open questions

- Death saves: track on the mat, track elsewhere, or skip entirely?
- Condition tokens: what's the full list of conditions that need a physical token, and how many of each?
