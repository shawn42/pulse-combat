# Pulse Combat — Questions to Answer With Live Test Play

Provisional rulings that were reasoned through at the table but not yet validated against actual play. Each entry is a decision we're going with *for now* — this doc tracks what to watch for, and what to do if it turns out wrong.

## How to use this doc

When a provisional rule breaks down in play (something feels too weak, too strong, or just wrong), add a note under the relevant entry with the date and what happened, rather than immediately changing the rule mid-session. Revisit between sessions once there's more than one data point.

---

## Open questions

### 1. Do all conditions clearing at the Fate pause over-nerf anything?

**The ruling:** every condition (Paralyzed, Restrained, Frightened, Charmed, Stunned, etc.) clears at the next Fate pause, no exceptions except Prone. See `pulse_combat_system_overview.md` → Conditions.

**Why flagged:** this is a broad, one-size-fits-all default adopted specifically to avoid per-spell timing rules (and, as a side effect, to bound Divine Smite/Ensnaring Strike stacking against a paralyzed target — see `pulse_combat_spells.md`). It was never stress-tested against every condition individually. Some conditions (e.g. a long-duration Banishment, a Frightened effect meant to shut a creature out of melee for a while) may lose most of their value if they can't outlast ~30 seconds.

**Watch for:** a player or the DM noting that a control spell or fear/charm effect "didn't do anything" because it cleared before it mattered, especially against high-CR targets where the caster was relying on it to lock something down for more than one cycle.

**If it breaks:** don't change the default. Add a per-condition or per-spell exception here (the way Prone already is one), and note it back in the overview doc's Conditions section as an explicit named exception.

---

### 2. Divine Smite: is a 4-attack-per-cycle ceiling actually fine?

**The ruling:** Divine Smite (and Ensnaring Strike) are bounded by the Conditions rule above — a paralyzed target is only vulnerable for one Fate cycle, and at current timings that's ~2 full actions per PC, which for a Paladin with Extra Attack means up to 4 smitable hits. Accepted for now on the assumption that the extra dice-rolling overhead makes a second full action unlikely to actually land in the same cycle. See `pulse_combat_spells.md` → Divine Smite.

**Why flagged:** this is a bound, not a verified-safe number — nobody has checked it against actual target HP/CR at the table.

**Watch for:** a single Paladin one-shotting or near-one-shotting a boss-tier target off one paralysis window.

**If it breaks:** revisit an explicit per-cycle smite cap in the PCS overview doc, the same way Fireball got a one-shared-token-per-encounter cap instead of relying purely on slot count (see `pulse_combat_spells.md` → Fireball, and the queue in that doc).

---

### 3. Printed HP track + sliding marker — does the physical mechanism actually work?

**The ruling:** current HP moves off the bead bowl and onto the player placard itself, as a printed numbered track (1 to max HP) with a sliding marker/clip. See `docs/placards/player-placard.md` → Decisions log, 2026-09-01. **First prototype to build**: thicker card stock or thin cardboard for the placard itself (rigid enough to hold a clip without bending), plain paperclip as the slider — cheapest possible version, no laminating or custom parts needed to take a first pass at it.

**Why flagged:** this reverses an earlier decision (bead bowl, kept deliberately off the mat) purely on paper reasoning — nobody's actually built or handled one yet. Bead bowls work at mob-placard scale already (players self-serve from a shared bin, "hungry hungry hippos" style); a printed track is a different physical object entirely and its failure modes are unknown.

**Watch for:** does a paperclip actually stay put on card stock/cardboard through a session (slides during handling, gets bumped, falls off if the card isn't rigid enough)? Is a 1-to-64-ish range track legible enough to slide precisely to one number without squinting? Does re-marking it for a new fight (reset to max) feel fast or fiddly compared to just re-filling a bead bowl?

**If it breaks:** don't necessarily revert to the bead bowl — try upgrading the physical build first (lamination or a stiffer card so the clip grips better, a chunkier track with fewer/larger gradations, a different clip style). Only fall back to bead bowls or the personal-chip-stack alternative if the track concept itself turns out to be the problem, not just the cheap first-pass materials.

---

### 4. Fixed/passive mob saves — does it feel too deterministic at the table?

**The ruling:** every monster saving throw resolves as `10 + mod`, no roll, ever. See `docs/placards/mob-placard.md` → Decisions log, 2026-09-01. Chosen for zero build cost and fast batch-resolution of simultaneous saves (e.g. a multi-target Hypnotic Pattern hitting several mobs at once).

**Why flagged:** this is a real gameplay-feel tradeoff, not just a speed win. A mob with a bad save now *always* fails against a caster who knows the DC — no variance, no chance for a lucky save to create a tense moment. Untested against how it actually plays.

**Watch for:** does a "the boss just always fails this save" outcome feel flat or anticlimactic in actual play? Does resolving a mob's *own* forced saves (e.g. against LR-negation decisions) feel wrong without a roll? Conversely — does the speed win feel worth it once you're mid-encounter with multiple mobs needing saves at once?

**If it breaks:** don't necessarily go straight to a live-respin app feature (the most expensive option). Try pre-rolled batch first (a DM rolls a stack of results before the session) — same randomness, no new component needed, just session prep. Only build the app feature if pre-rolled batches also feel unsatisfying.

---

*Add new entries below as they come up. Keep each one to: the ruling, why it's flagged, what to watch for, and what to do if it breaks.*
