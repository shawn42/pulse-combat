# Pulse Combat Spell Audit

**Status:** living doc, seeded with spells already flagged across design discussions and sims. Not a full 5e spell pass — grown one spell at a time as they come up in play or simulation, per the original design intent: *"Each will be, as-is... or should not be used... or needs heavy adjustment, with a summary of the adjustment."*

## Classification

- **As-is** — plays the same as standard 5e, no Pulse-specific issue found.
- **Adjusted (resolved)** — has a documented, Pulse-specific fix.
- **Needs adjustment** — a real problem has been identified, but the fix isn't locked yet.
- **Likely broken / do not use** — fundamentally incompatible with real-time Pulse as currently designed.
- **Not yet evaluated** — flagged as a concern, deliberately deferred, never actually worked through.

## Spell table

| Spell | Save? | Bucket | Why | Fix (if resolved) |
|---|---|---|---|---|
| **Hold Person** | Wisdom | Adjusted (resolved) | Standard 5e re-save-every-turn doesn't map to continuous real-time play. | Lasts until the next Fate pause; single save on the initial effect; a boss's Legendary Resistance can negate it (costing 50% of the boss's energy bar to do so). Documented in `pulse_combat_system_overview.md`. |
| **Counterspell** | — | Adjusted (resolved) | Turn-based reaction timing doesn't map cleanly to continuous energy, and multiple simultaneous counterspell attempts needed a resolution rule. | Costs reaction energy (25%) + a Counterspell token. If multiple casters attempt it on the same spell, one success stops it, but *everyone* who attempted spends their token regardless of outcome. Documented in `pulse_combat_system_overview.md`. |
| **Fireball** | Dexterity | Needs adjustment | The core nova problem that started the whole spell-token debate. 5e's turn order naturally spaces out how many Fireballs can land in a short window; Pulse's continuous energy removes that pacing, so multiple casters (or one caster with spare slots) can all drop it inside a single Fate cycle. Explicitly banned from the T-Rex sim rather than resolved. | Not locked. Candidate fixes are the same ones parked in the spell-token debate: a spell-specific token cap, a no-consecutive-Pulse cooldown, or a shared "big-spell lane." See `docs/placards/player-placard.md` → To Discuss. Note: when an **NPC** casts Fireball, the system already uses a different, already-designed pattern — a recharge timer (`Fireball 6d6, recharge 3 Fate cycles`, per the sample boss in the overview doc) — which may be a reusable model for the PC-side fix. |
| **Conjure Animals** | — *(summons make their own attacks/saves)* | Likely broken / do not use | Every summoned creature needs its own independent energy timer, multiplying one PC's action economy far beyond anything 5e's turn structure allows. Excluded from the T-Rex sim rather than resolved; matches open design question #6 from the original conversation ("Summons and companions: their independent timers can rapidly increase action economy"), which was never closed. | Not designed. No adjustment attempt has been made yet — this is currently a hard "don't bring this spell into a game" rather than a "here's the fix." |
| **Banishment** | Charisma | Needs review | Only ever covered generically, lumped into "control spells" alongside Hold Person in the overview doc's category table. Never individually simulated, so its specific edge cases (banishing summoned/extraplanar creatures possibly-permanently, its already-long base duration vs. the Fate-pause duration model) haven't been checked. | Tentatively inherits the Hold Person treatment (lasts until next Fate pause, single save, LR can negate) but this hasn't been stress-tested against Banishment specifically. |
| **Hypnotic Pattern** *(and similar AoE charm/incapacitate spells)* | Wisdom | Needs review | The first true **multi-target** control spell in this table — Hold Person and Banishment are single-target, but a 30-ft-cube save-or-charmed hits everyone who can see it at once, potentially several non-minions in the same cast. Two things the existing "control spells" treatment was never designed around: (1) does each affected non-minion get to spend its **own** LR independently to negate, meaning a well-rolled boss + lieutenants could all shrug it off, or does the spell only let one of them resist? (2) does a single cast risk neutralizing an entire multi-enemy encounter in one action, with no re-roll chance since it isn't concentration-ticked per creature? Also the first non-damaging AoE save looked at against **minions**: Flee, Mortals!'s Instant Death trait only triggers on a failed save against a *damage-dealing* effect (see Minions section, overview doc) — Hypnotic Pattern deals no damage, so a minion that fails its save is Charmed/Incapacitated like anything else, not instantly killed. First case of a minion surviving a failed save. | Tentatively inherits the Hold Person treatment (lasts until next Fate pause, single save, LR can negate) per affected creature, but the multi-target LR-spending question is untested and could make this spell either much stronger or much weaker than intended depending on the answer. |
| **Shield** | — | As-is | Only ever appears as an example reaction spell (25% energy cost, same bucket as Counterspell/opportunity attack). Never flagged as broken, never separately stress-tested either. | — |
| **Divine Smite** *(Paladin feature, not a spell, but consumes the same spell-slot resource)* | — | Adjusted (resolved) | Raised directly: "Paladin smite stacking during paralysis." In 5e, only weapon-attack turns limit smite stacking; Pulse's compressed real-time action economy plus a paralyzed (auto-crit-eligible) target could make stacking much worse than standard 5e. Deferred pending the Legendary Resistance ruling, then resolved once conditions got a general Fate-pause-bound rule. Bodett's **Ensnaring Strike** rides along on the same fix — same slot-on-hit pattern. | Bounded by the general Conditions rule (`pulse_combat_system_overview.md` → Conditions): a paralyzed target's window can't outlive the current Fate cycle. At current timings (~2 full actions/PC/cycle), a Paladin with Extra Attack can land up to 4 smitable hits in that window — allowed for now on the assumption the extra rolls make a second full action unlikely to actually land in time. Revisit note: consider an explicit per-cycle smite cap in the overview doc, the same way Fireball is trending toward an explicit token/cooldown limit rather than relying on slot count alone. Tracked for live-play validation in `pulse_combat_live_test_questions.md`. |
| **Healing Spirit** | — | Adjusted (resolved) | Initially framed as the same nova shape as Fireball, but the actual printed text already hard-caps total healing at `1 + spellcasting mod` (min 2) triggers before the spirit disappears — not an open tap. Re-examined and resolved rather than needing Fireball-style token/cooldown machinery. Found in Bodett's kit. | Place a physical stack of N chips (N = 1 + spellcasting mod, min 2) at the spirit's map location alongside its token. Any **visible creature — ally or enemy** — that enters its space or starts its turn there removes one chip and heals 1d6; spirit disappears at zero. RAW doesn't restrict this to allies ("a visible creature," no ownership language), and that's kept intentionally: an enemy diving through the spirit to heal itself or burn the party's charges is real contested-resource texture, not a bug — reverse this only as a deliberate house rule, not a Pulse fix. The walk-in/walk-out shuffle (draining the stack in one continuous move) is a pre-existing 5e table-ruling question, identical in Pulse and standard turn-based play — not something Pulse needs to solve. |
| **Tasha's Caustic Brew** | Dexterity | Needs review | Has a "redirect it each of your turns" maintenance mechanic. Technically already covered by the generic "spells with per-turn effects scale to Fate duration" category rule, but never individually verified against it. Found in Tes's kit. | Tentatively inherits the generic per-turn-effect rule; unverified. |
| **Breath of the Deep** *(3rd-party — Cthulhu by Torchlight)* | **None stated** | Needs review | Source text (1 action, 120ft, V/S, concentration up to 10 min): 3d6 bludgeoning + can't speak/use verbal components, with **no attack roll or saving throw of any kind** — a guaranteed, fully unresisted damage-plus-silence effect. This is a 5e balance concern independent of Pulse (no counterplay at all for the target), and it's not clear the 5e team ever intended a no-save silence to exist — likely just a lower-power-book oversight or abbreviated write-up. Found in Arvin's kit. | Not designed. Needs a ruling: play as written (no save), or house-add a save before using it at the table? |

## Related non-spell feature flagged alongside these

- **Rogue Sneak Attack burst** — *Resolved.* Raised in the same breath as Divine Smite stacking ("Paladin smite stacking during paralysis" and "rogue sneak attack burst") and deferred the same way. Doesn't consume spell slots, so it's out of scope for this doc's table, but the fix is now locked: Sneak Attack is capped at once per Fate cycle, regardless of action type (full action, bonus action, or reaction) — see `pulse_combat_system_overview.md` → Sneak Attack. Unlike Divine Smite, this isn't bounded by the Conditions rule (it isn't gated by the target's condition) — the actual exposure was that bonus actions and reactions refill much faster than the full-action bar, so a Rogue could otherwise stack Sneak Attack onto every qualifying hit in a cycle instead of just one.

## Character / party spell-list gaps

Grounded only where confirmed — no guessed spell lists.

- **Arvin** (Autognome Warlock 4 (The Fathomless) / Sorcerer 1 (Storm Sorcery) — the Sorlock member of the "arach-neds" party, https://www.dndbeyond.com/characters/165658548, raw data pulled to `scratchpad/arvin.json`). Confirmed: Spell Save DC 14, two spell-slot pools (Sorc L1 ×2, Pact L2 ×2), signature attack "Tentacle of the Deeps" (a Fathomless class feature, not a spell). **Known spells (26 entries), pulled 2026-08-21:**

  | Level | Spell | Source | Save? |
  |---|---|---|---|
  | Cantrip | Eldritch Blast | Warlock known | — (attack roll) |
  | Cantrip | Lightning Lure | Warlock known | — (attack roll) |
  | Cantrip | Confounding Shadows | Warlock known | — (attack roll) |
  | Cantrip | Bright Sparks | Sorcerer known | — (attack roll) |
  | Cantrip | Finger Guns | Sorcerer known | — (attack roll) |
  | Cantrip | Moment to Think | Sorcerer known | — |
  | Cantrip | Shocking Grasp | Sorcerer known | — (attack roll) |
  | Cantrip | Create Bonfire | Granted *(likely Pact of the Tome)* | Dexterity |
  | Cantrip | Shape Water | Granted *(likely Pact of the Tome)* | — |
  | Cantrip | Word of Radiance | Granted *(likely Pact of the Tome)* | Constitution |
  | Cantrip | Guidance | Feat-granted *(likely Magic Initiate)* | — |
  | Cantrip | Mending | Feat-granted *(likely Magic Initiate)* | — |
  | 1st | Armor of Agathys | Warlock known | — |
  | 1st | Arms of Hadar | Warlock known | Strength |
  | 1st | Hellish Rebuke | Warlock known | Dexterity |
  | 1st | Conjure Cover | Sorcerer known | — (creates a destructible cover wall, doesn't target a creature; confirmed 3rd-party — Valda's Spire of Secrets; as-is, no attack/save needed) |
  | 1st | Umbral Tendril | Sorcerer known | — (ranged spell attack; confirmed 3rd-party — Cthulhu by Torchlight — 2d8 necrotic + temp HP on hit, scales with slot level; as-is, same shape as Eldritch Blast/Fire Bolt) |
  | 1st | Find Familiar | Granted, ritual | — |
  | 1st | Tenser's Floating Disk | Granted, ritual | — |
  | 1st | Identify | Item-granted | — |
  | 1st | Shield of Faith | Feat-granted | — |
  | 2nd | Breath of the Deep | Warlock known | **None** — source text has no attack roll or save at all: flat 3d6 bludgeoning + can't speak/use verbal components, for up to 10 min concentration *(now flagged above — Needs review)* |
  | 2nd | Spider Climb | Warlock known | — |
  | 2nd | Magic Mouth | Granted, ritual | — |
  | 2nd | Skywrite | Granted, ritual | — |
  | 2nd | Alter Self | Item-granted | — |

  All three previously-unconfirmed spells are now resolved with real source text: **Breath of the Deep** and **Umbral Tendril** (Cthulhu by Torchlight) and **Conjure Cover** (Valda's Spire of Secrets — the same 3rd-party book Elion's Polybrachia comes from). Umbral Tendril and Conjure Cover are both clean as-is; Breath of the Deep is flagged in the main table for its no-save silence.

  None of these overlap the flagged-spell table above (no Fireball/Hold Person/Counterspell/Conjure Animals/Banishment/Shield/Divine Smite in his kit). One is directly relevant to an open question though: **Find Familiar** is a live, small-scale instance of the still-unresolved "summons get independent timers" problem (open design question #6, same root issue as Conjure Animals) — worth using as the first test case whenever that question gets picked back up.
- **Bodett** (Ranger 6, Swarmkeeper — the Ranger/Swarmkeeper member of the "arach-neds" party, per the export's correction "the druid is ranger/swarmkeeper" — parsed from a saved sheet at `docs/chars/Bodett.html`, 2026-08-21). **Known spells (7):**

  | Level | Spell | Source | Save? |
  |---|---|---|---|
  | Cantrip | Mage Hand | Swarmkeeper Magic (subclass-granted) | — |
  | 1st | Ensnaring Strike | Ranger known | Strength |
  | 1st | Faerie Fire | Swarmkeeper Magic (subclass-granted) | Dexterity |
  | 1st | Zephyr Strike | Ranger known | — |
  | 2nd | Healing Spirit | Ranger known | — *(now flagged above — Needs adjustment)* |
  | 2nd | Pass without Trace | Ranger known | — |
  | 2nd | Web | Swarmkeeper Magic (subclass-granted) | Dexterity |

  No overlap with the flagged-spell table beyond Healing Spirit (added above), but **Ensnaring Strike** rides along with Divine Smite's resolution above (same slot-on-hit pattern, same Conditions-rule bound), and **Web** falls under the same generic "control spells" category as Hold Person/Banishment — never individually checked either.

- **Tes** (Tesiahna "Tes" Dappledell, Artificer 5), **Elion** (Warlock 5, Hexblade — confirms this is the Hexblade/Pact-of-Blade Warlock from the export), **Loremi** (Loremi Psum, Barbarian 5, **Path of the Giant** — identified via the Thaumaturgy-granting "Giant's Power" subclass feature) — the rest of the "arach-neds" party, re-parsed from Spells-tab resaves at `docs/chars/{Tes,Elion,Loremi}.html`, 2026-08-21. Full lists now, superseding the earlier Actions-tab partial pull:

  **Tes (Artificer 5, prepared caster) — 13 spells:**

  | Level | Spell | Source | Save? |
  |---|---|---|---|
  | Cantrip | Fire Bolt | Artificer known | — (attack roll) |
  | Cantrip | Mending | Artificer known | — |
  | 1st | Cure Wounds | Artificer prepared | — |
  | 1st | Faerie Fire | Artificer prepared | Dexterity |
  | 1st | Heroism | Artificer prepared | — |
  | 1st | Shield | Artificer prepared | — |
  | 1st | Tasha's Caustic Brew | Artificer prepared | Dexterity *(now flagged above — Needs review)* |
  | 2nd | Aid | Artificer prepared | — |
  | 2nd | Branding Smite | Artificer prepared | — |
  | 2nd | Lesser Restoration | Artificer prepared | — |
  | 2nd | Vortex Warp | Artificer prepared | Constitution |
  | 2nd | Warding Bond | Artificer prepared | — |
  | 2nd | Web | Artificer prepared | Dexterity |

  **Elion (Warlock 5, Hexblade) — 10 spells.** Pure Warlock, so every known spell is cast from his single Pact Magic pool at his max slot level (3rd, at level 5) regardless of the spell's own base level — the same one-pool-per-caster-level mechanic behind the Sorc/Pact split found on Arvin's mat, just simpler here since there's no second class:

  | Base level | Spell | Source | Save? |
  |---|---|---|---|
  | Cantrip | Eldritch Blast | Warlock known | — (attack roll) |
  | Cantrip | Friends | Warlock known | — |
  | Cantrip | Minor Illusion | Warlock known | — |
  | Cantrip | Mage Hand | Feat-granted (Telekinetic) | — |
  | 1st | Hex | Warlock known (cast at 3rd via Pact Magic) | — |
  | 1st | Misty Step | Warlock known (cast at 3rd via Pact Magic) | — |
  | 1st | Unseen Servant | Warlock known (cast at 3rd via Pact Magic) | — |
  | 1st | Detect Magic | Invocation-granted, ritual | — |
  | 1st | Disguise Self | Invocation-granted, ritual | — |
  | 3rd | Counterspell | Warlock known | — |
  | 3rd | Suggestion | Warlock known | Wisdom |
  | — | Polybrachia | Warlock known *(Valda's Spire of Secrets, per web search)* | — |

  **Loremi (Barbarian 5, Path of the Giant) — 1 spell:** Thaumaturgy (cantrip, no save, granted by the "Giant's Power" subclass feature).

  Cross-references against the flagged-spell table: **Elion has Counterspell** — confirms the already-resolved mechanic is in real use. **Tes has Shield** (matches the "As-is" row) and **Tes has Web** (matches Bodett — now two PCs know it, worth bumping up the "control spells" category-check priority). **Elion's Suggestion** (Wisdom save) is a charm/control spell not currently in the flagged table at all — same untested-category situation as Banishment.

  With Arvin as the Sorlock (above), this completes all 5 "arach-neds" party members: Bodett, Tes, Elion, Loremi, Arvin.
- **Level 2 sim party** — only spell ever pinned down was the wizard's Hold Person, and only to correct that it isn't available until character level 3 (already reflected in the Hold Person row above, not a new spell).
- **Level 8 sim party** — no specific PC spells were ever named in that sim.

## Next candidates to evaluate

Queue for the next pass, in rough priority order:
1. Conjure Animals fix-or-ban decision (currently a hard ban with no designed alternative) — Find Familiar (Arvin's kit) is a smaller-scale real test case for the same underlying problem
2. Fireball's token/cooldown/lane decision (blocks closing the broader spell-resource-model question) — and while there, revisit an explicit per-cycle Divine Smite cap in the overview doc using the same explicit-limit approach (see Divine Smite row above)
3. Verify the generic "control spells" and "per-turn effects" category rules actually hold up for Banishment, Web (now 2 PCs), Suggestion, and Tasha's Caustic Brew — all currently just inherit an untested rule rather than being individually checked. **Hypnotic Pattern is the priority case here**: it's the first multi-target control spell, and the "does each non-minion spend its own LR independently" question needs an answer before this category can be called verified at all, not just for this one spell.
4. Rule on Breath of the Deep's no-save silence — is it played as written, or does it need a house-added save before it's used at the table? (Arvin's kit)

See also `pulse_combat_live_test_questions.md` for provisional rulings (the Conditions default, the Divine Smite 4-hit ceiling) that need validation at the table rather than more design work.
