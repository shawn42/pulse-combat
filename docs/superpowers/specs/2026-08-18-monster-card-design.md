# Player-Facing Monster Card — Design Doc

**Status:** Content/requirements only. Layout and visual design are a follow-up pass.

## Purpose

Same rationale as the player mat (`2026-08-18-player-mat-design.md`): speed up the parts of combat the app doesn't handle. For monsters, that means giving players table-visible information about an enemy so they can make tactical calls — "can I hit this?", "does an area spell threaten its save?" — without interrupting the DM or breaking the pace that Pulse Combat is built around.

This is explicitly **not** a DM stat block. The DM's own full reference (complete stats, attacks, tactics) is a separate, future design doc. This card only carries what a player would reasonably be able to see or infer about an enemy at the table. As an initial pass, this same card is good enough to double as a rough DM reference too, but that's not its design target.

## Scope

**One universal template covers all three enemy tiers** — Boss, Lieutenant, and Minion (per the existing rules overview's tiering). All three use the same fields; simpler enemies (e.g. minions) just leave fields blank rather than needing a distinct template.

## Contents

1. **Name/type + portrait/art area.** Lets players visually distinguish one monster card from another at a glance, especially with multiple enemies on the table at once.

2. **AC.** Printed so players can immediately judge whether an attack roll hits, without asking the DM.

3. **Saving throw bonuses (all 6).** Mirrors the player mat — relevant whenever a player's area spell or effect targets one of the monster's saves.

4. **Resistances / Vulnerabilities / Immunities.** Included, but flagged as low-priority: infrequently relevant for typical Pulse-style enemies, and often left blank. Not worth heavy design investment.

5. **Max HP** — printed as a single number. Current HP is tracked via a separate, visible bead pool (same pattern as the player mat), consistent with the rules overview's existing description of large bead counters for boss HP (100–250 for high-CR encounters). Players can see the pool shrink as damage lands.

## Explicitly excluded

- **Legendary Resistance uses.** Stays hidden / DM-only. Revealing remaining LR count would let players play around it (e.g. skip control spells entirely when LR is empty), which undercuts its purpose per the rules overview.
- **Attack info** (weapon, damage type, reach/range). Left off — narrated by the DM in the moment rather than pre-printed.
- **Conditions.** No dedicated card zone — see Shared Components below.

## Production

Blank template, hand-filled per monster before a session — same approach as the player mat. No auto-generation planned for this pass.

## Shared components (not owned by this doc)

**Condition tokens.** Same shared bin of physical condition tokens described in the player mat doc. Players or the DM grab a token and drop it on the card to mark an active condition; no printed zone required.

## Open questions

- None specific to this doc beyond what's shared with the player mat (see that doc's open questions).
