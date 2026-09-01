# DM Placard — Living Design Outline

**Status:** living outline for iteration, not frozen. New artifact — the "behind the screen" counterpart to `mob-placard.md`, previously flagged there under Deferred to future artifacts as "a separate future doc entirely."

## Purpose

- DM-only. Holds everything intentionally excluded from the player-facing mob placard: full attack info, Legendary Resistance tracking, energy rate, recharge counters, and any tactical notes for how to run the creature.
- Sits behind the DM's screen — players never see this side.

## Scope

- Same universal template as the player-facing mob placard: one layout covers Boss, Lieutenant, and Minion, with simpler entries (minions) leaving fields blank (e.g. no LR line).

## Confirmed contents

- Name/type + role (Boss / Lieutenant / Minion) + CR
- AC, Max HP — same numbers as the player-facing mob placard, repeated here for at-a-glance use without flipping cards mid-combat
- Energy N — party-size-adjusted for non-minions per the Monster Scaling rule (`max(10s, 15s − #PCs)`); minions stay fixed at 15s
- Legendary Resistance — remaining uses, ticked off as spent (hidden from players per `mob-placard.md`)
- Full attack/action block — attack bonus, damage, save DCs the monster forces, recharge timers, multiattack breakdown
- Full special traits (untruncated — the player card only lists these as "DM-narrated," this card has the actual text)
- Saving throws and Resist/Vuln/Immune — duplicated from the player-facing card for convenience (see To Discuss below)

## Explicitly excluded / not tracked

- **Bloodied/enrage threshold** — still no printed number, even here. This card inherits the existing `mob-placard.md` decision (DM eyeballs remaining beads) rather than relitigating it.

## To discuss (open design tensions)

- **Tactics/DM notes field** — worth a line per monster (e.g. the Lieutenant sample stat block in `pulse_combat_system_overview.md` has "Tactic: focused attacks on one PC")? Not yet standardized — none of the three reference monsters below have one defined yet.
- **Duplication vs. cross-reference** — this card repeats AC/HP/Saves/Resist that already live on the player-facing mob placard. Full duplication avoids page-flipping mid-combat but doubles what needs updating if a stat changes. Drafted as full duplication below; worth a real call once both cards exist as physical artifacts.

## Reference monster validation

- **Rat King** (Boss, CR 8) — homebrew stat block, source: `Rat King.md`
- **Wererat Lord** (Lieutenant, CR 5) — [5esrd.com](https://www.5esrd.com/database/creature/wererat-lord/), from Legendary Games' *Mother of Monsters*
- **Giant Rat** (Minion, CR 1/8) — homebrew stat block, source: `Giant Rat.md`

```
┌────────────────────────────────────────────────┐
│  RAT KING  —  BOSS                   DM ONLY    │
│  Large Aberration — CR 8                        │
├────────────────────────────────────────────────┤
│  AC 17      Max HP 170      Energy N: 11s*      │
│  Legendary Resistance:  [ ] [ ]     (2 uses)    │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR +5       DEX -1        CON +3             │
│   INT +2       WIS +2        CHA +5             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   Immune: Charmed, Frightened                   │
├────────────────────────────────────────────────┤
│  ACTIONS                                        │
│  Multiattack: 2× Tail Whip, then Psychic Blast  │
│    or Spellcasting.                             │
│  Tail Whip +8 (melee 5ft or ranged 120ft):      │
│    8d6+5 psychic. Target INT save DC16 or       │
│    Dazed+Slowed until next Fate pause.          │
│  Psychic Blast (Recharge 5-6): 60ft cone, INT   │
│    save DC16, fail: 6d6 psychic + Jinxed 1d10   │
│    (save ends).                                 │
│  Spellcasting (CHA, DC16): at-will Mage Hand,   │
│    Thaumaturgy; 1/day Evard's Black Tentacles,  │
│    Telekinesis.                                 │
├────────────────────────────────────────────────┤
│  TACTICS / DM NOTES                             │
│   (not yet defined)                             │
└────────────────────────────────────────────────┘
* Energy N uses max(10s, 15s − #PCs); shown at 4 PCs.
```

```
┌────────────────────────────────────────────────┐
│  WERERAT LORD  —  LIEUTENANT         DM ONLY    │
│  Large Humanoid (shapechanger) — CR 5           │
├────────────────────────────────────────────────┤
│  AC 13      Max HP 44       Energy N: 11s*      │
│  Legendary Resistance:  [ ]         (1 use)     │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR +3       DEX +3        CON +1             │
│   INT +1       WIS +1        CHA  0             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   (none listed in source stat block)            │
├────────────────────────────────────────────────┤
│  ACTIONS                                        │
│  Multiattack (humanoid/hybrid only): 3 attacks, │
│    only 1 can be Bite.                          │
│  Bite (rat/hybrid only) +5: 1d4+3 piercing.     │
│    Humanoid target: DC11 CON save or cursed     │
│    with wererat lycanthropy** (see note).       │
│  Shortsword (humanoid/hybrid) +5: 1d6+3.        │
│  Dagger (humanoid/hybrid, ranged 20/60) +5:     │
│    1d4+3 piercing.                              │
├────────────────────────────────────────────────┤
│  TRAITS                                         │
│   Shapechanger (rat/hybrid/humanoid, same       │
│     stats each form) · Keen Smell (adv. on      │
│     WIS (Perception) by smell) · Sneak Attack   │
│     (+3d6 w/ advantage or an adjacent ally) ·   │
│     Summon Rats 1/day.                          │
├────────────────────────────────────────────────┤
│  TACTICS / DM NOTES                             │
│   (not yet defined)                             │
└────────────────────────────────────────────────┘
*  Energy N uses max(10s, 15s − #PCs); shown at 4 PCs.
** Lycanthropy curse is not a Condition — it does not clear at
   the next Fate pause. See Conditions section, overview doc.
```

```
┌────────────────────────────────────────────────┐
│  GIANT RAT  —  MINION                DM ONLY    │
│  Small Beast — CR 1/8                           │
├────────────────────────────────────────────────┤
│  AC 13      Max HP 7        Energy N: 15s       │
│  Legendary Resistance:  n/a (minions never get) │
├────────────────────────────────────────────────┤
│  SAVING THROWS              (● = proficient)    │
│   STR -2       DEX ● +5      CON  0             │
│   INT -4       WIS  0        CHA -3             │
├────────────────────────────────────────────────┤
│  RESIST / VULN / IMMUNE                         │
│   (none)                                        │
├────────────────────────────────────────────────┤
│  ACTIONS                                        │
│  Bite +5: 1d4+3 piercing.                       │
├────────────────────────────────────────────────┤
│  TRAITS                                         │
│   Pack Tactics — advantage if an ally is        │
│     adjacent to the target and not              │
│     Incapacitated.                              │
├────────────────────────────────────────────────┤
│  TACTICS / DM NOTES                             │
│   HP tracked with small counters; 1-2 PC hits   │
│   kills. Rollover damage applies across the     │
│   swarm per Minions rules.                      │
└────────────────────────────────────────────────┘
```
