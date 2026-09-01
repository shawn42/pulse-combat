# Rat King Encounter — Playtest Build List

Living checklist of what needs to physically exist before the first live playtest: arach-neds (Bodett, Tes, Elion, Loremi, Arvin) vs. the two-wave Rat King encounter (Wererat Lord + Giant Rats, then Rat King + more Giant Rats). Each item is marked **Ready**, **Needs data**, or **Needs design** — a "Needs" item blocks building that piece correctly right now.

## Player placards (5)

| PC | Status | What's missing |
|---|---|---|
| **Arvin** | Ready | **Updated 2026-09-01 — party leveled, his data was stale, now fully current.** AC16/HP44 (up from 35), all saves, weapons/attacks, and a revised 32-spell list confirmed in `pulse_combat_spells.md`. Slots: Sorc 1st ×2, Pact 3rd ×2. Two separate DCs, not an ambiguity: Warlock spells DC 14, Sorcerer spells DC 15. |
| **Bodett** | Ready | AC/HP/ability scores/saves/DC/attack/weapons/spell slots (1st×4, 2nd×2) all confirmed. Healing Spirit chip-stack size resolved: **4 charges**. |
| **Tes** | Ready | AC/HP/saves/DC/attack/weapons/spell slots (1st×4, 2nd×2) all confirmed — **note: her real Max HP is 51, not the 43 the Monte Carlo sim used** (see spells doc for the flag). **Steel Defender companion resolved 2026-09-01**: gets its own mini reference placard, no independent timer — Tes commands it via her own bonus action (50% energy). See overview doc → Companions & Single Summons. |
| **Elion** | Ready (small unknown) | AC/HP/saves/DC/attack/weapons/Pact Magic slots (2 at 3rd level) all confirmed. One unconfirmed cosmetic detail: what the extra "+2d6" rider on his Mind Blade attack actually is (Hexblade's Curse active, or a crit feature) — doesn't block building the placard. |
| **Loremi** | Ready | AC/HP/saves/attacks/weapons all confirmed, 0 spell slots (Thaumaturgy is at-will). One unconfirmed detail: exact effect of his "Strike of the Giants: Frost Strike" limited-use feature (3 uses, 1d6 rider) — minor, doesn't block building his placard. |

**Party level note:** all five PCs are now confirmed at their current level (Bodett/Tes/Elion/Loremi at 6, Arvin inferred at Warlock 5/Sorcerer 1 — total 6 — from his Pact slots moving to 3rd level).

## Mob placards — public (player-facing)

| Mob | Status |
|---|---|
| Rat King (Boss) | **Ready** — built in `mob-placard.md` → Reference monster validation. |
| Wererat Lord (Lieutenant) | **Ready** — same location. |
| Giant Rat (Minion) | **Ready** — same location. One shared template card is enough (minions are identical) — need **12 physical minis/copies now** (4 per wave × 3 waves), up from the sim's 8. |

## Mob placards — DM (behind the screen)

| Mob | Status |
|---|---|
| Rat King, Wererat Lord, Giant Rat | **Ready** — all three already drafted in `dm-placard.md`. |

## Condition chips needed for this specific encounter

| Condition | Source | Status |
|---|---|---|
| Dazed | Rat King's Tail Whip | Needs design — new, not in the existing shared bin |
| Slowed | Rat King's Tail Whip | Needs design — new |
| Jinxed | Rat King's Psychic Blast | Ready — **no chip; a bright red die is the marker.** Hand the affected creature a red d10 (matching this cast's die size) — it sits with them as both the "you're Jinxed" reminder and the actual roll tool, rolled and subtracted from every attack/save while active. Clears at next Fate pause per the Conditions rule, same as everything else. Build a small matched set (red d4/d6/d8/d10/d12, 2 of each) rather than just one d10, so future different-sized Jinxed sources are covered and two simultaneous instances of the same size don't collide. |
| Restrained | Ensnaring Strike (Bodett), Web (Bodett + Tes) | Needs design |
| Charmed | Suggestion (Elion) | Needs design |
| Concentration | generic, several spells | Ready — existing interim generic chip |
| Advantage/Disadvantage | generic | Ready — existing interim generic chip |

Prone/Poisoned/Paralyzed already exist in the standard shared bin but nothing in this specific encounter/party currently triggers them — build only if you want the full standard set on hand regardless.

## Spell chips / tokens

| PC | Needed | Status |
|---|---|---|
| Arvin | Sorc L1 ×2, Pact L2 ×2 | Ready |
| Bodett | Healing Spirit chip-stack: **4 charges**. Slot chips: **1st ×4, 2nd ×2** | Ready |
| Tes | Slot chips: **1st ×4, 2nd ×2**. No spell-specific tokens beyond that | Ready |
| Elion | Counterspell token(s) (count TBD — how many available per encounter, not yet decided). Pact Magic slot chips: **2 at 3rd level** | Needs one small decision (Counterspell token count) |
| Loremi | None | Ready (n/a) |

**Not needed for this encounter:** a Fireball token — nobody in this party has Fireball, so the new one-token-per-encounter rule never comes into play here.

## Assumed already available

Battle map/table surface, minis for all 5 PCs and all 3 monster types (Rat King, Wererat Lord, Giant Rat).

## Open questions that could change this list

1. ~~Mob save resolution mechanic is still undecided~~ — **resolved 2026-09-01: fixed/passive (`10 + mod`), no roll, no new component needed.** Flagged for reassessment after a real playtest if it feels too deterministic — see `pulse_combat_live_test_questions.md`.
2. ~~Jinxed is mechanically undefined~~ — **resolved 2026-09-01**: roll the indicated die (d10, per the Rat King's cast) and subtract it from every attack roll or saving throw while active. Also prompted broadening the Conditions rule's scope to explicitly cover homebrew status effects with the same shape, not just the 5e-named list — see overview doc.
3. ~~Bodett's full ability scores~~ — **resolved 2026-09-01**, pulled from `docs/chars/bodett-actions.html`.
4. ~~Exact spell-slot counts for Bodett, Tes, and Elion~~ — **resolved 2026-09-01**: Bodett 1st×4/2nd×2, Tes 1st×4/2nd×2, Elion 2 at 3rd (Pact Magic). All three independently match their class's standard level-6 slot table.
5. ~~Weapon attack bonus + damage~~ — **resolved 2026-09-01** for all 4, pulled from their `*-actions.html` saves.
6. ~~Actual minion count for the table~~ — **decided 2026-09-01: three waves, 12 Giant Rats total (4+4+4)**, not the sim's 8. Structure: Wave 1 = 4 rats only (warm-up, no LT/Boss). Wave 2 = 4 more rats + Wererat Lord. Wave 3 = 4 more rats + Rat King. Not yet re-simmed against this structure — the sim's win/TPK numbers are for the two-wave (8-rat) version only.
7. ~~Wave-2 trigger at the table~~ — **decided 2026-09-01, now two triggers for the three-wave structure**: Wave 1→2 fires when all 4 rats are dead (or 1 Fate cycle elapses as a fallback — minions don't have partial HP to test a percentage against). Wave 2→3 reuses the sim-validated rule: Wererat Lord ≤25% HP, or 2 Fate cycles elapse.
8. ~~The Rat King is still untuned~~ — **decided 2026-09-01: play as-is for the first playtest.** Going in with the expectation (per the sim) that this is a very likely loss — that's the point of a first playtest, to validate the sim against real play rather than pre-solve it at the table.
9. **HP-track legibility is physically untested** — a 1-to-64-ish range (Loremi) on card stock may need a bigger card or coarser gradations than a lower-HP character needs; won't know until it's built.
10. ~~Tes's Steel Defender companion~~ — **resolved 2026-09-01**: no independent timer, commanded via Tes's own bonus action. Also resolves system design question #6 (summons/companions) for the single-companion case — see overview doc → Companions & Single Summons. Still not reflected in any sim run, but structurally bounded to at most one extra attack per Tes bonus-action spend, so the existing numbers are a reasonable approximation.
11. **New: the Monte Carlo sim used the wrong HP for Tes** (43 instead of her real 51) for every run this session. Given TPK rates stayed above 96% across every variant tested, this almost certainly doesn't change the qualitative conclusion — but if the encounter gets retuned to a closer margin, this should be corrected and re-run rather than assumed negligible.
12. ~~The whole party appears to have leveled from 5 to 6~~ — **resolved 2026-09-01**: Arvin's data was pulled too. His Pact Magic slots jumped from 2nd to 3rd level, implying Warlock 4→5 (Sorcerer level unconfirmed, assumed still 1). This is an inference from the slot-level change, not a directly confirmed class/level field — worth a plain "what level is everyone now" confirmation from the table to close this out cleanly.
13. ~~Arvin's Spell Save DC is ambiguous~~ — **resolved**: not one ambiguous number, two real ones. Warlock spells DC 14, Sorcerer spells DC 15.
14. ~~Arvin's Sorc-1st and Pact-3rd slot counts~~ — **resolved**: Sorc 1st ×2, Pact 3rd ×2.
15. ~~Three of Arvin's previously-known spells didn't appear in this pull~~ — **closed, not a blocker**: Identify/Magic Mouth/Skywrite are non-combat utility spells, out of scope for encounter design either way.
