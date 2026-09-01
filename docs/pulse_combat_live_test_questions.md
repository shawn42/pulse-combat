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

**If it breaks:** revisit an explicit per-cycle smite cap in the PCS overview doc, the same way Fireball is moving toward an explicit token/cooldown limit instead of relying purely on slot count (see `pulse_combat_spells.md` → Fireball, and the queue in that doc).

---

*Add new entries below as they come up. Keep each one to: the ruling, why it's flagged, what to watch for, and what to do if it breaks.*
