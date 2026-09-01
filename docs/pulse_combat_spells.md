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
| **Fireball** | Dexterity | Adjusted (resolved) | The core nova problem that started the whole spell-token debate. 5e's turn order naturally spaces out how many Fireballs can land in a short window; Pulse's continuous energy removes that pacing, so multiple casters (or one caster with spare slots) could otherwise all drop it inside a single Fate cycle. Was explicitly banned from the T-Rex sim rather than resolved; now has a locked interim fix. | **For now: one shared Fireball token per encounter, full stop** — regardless of who casts it, how many casters have the spell, or how many slots are left. First cast of the encounter consumes the token; no more Fireballs land that encounter after. Party-wide shared resource, not per-caster. This directly caps the nova problem at the source (total casts, not pacing between casts) rather than trying to space out timing. Explicitly a "for now" interim ruling — revisit if one shared token per encounter feels too restrictive in actual play (add to `pulse_combat_live_test_questions.md` if so) rather than immediately reaching for a more complex cooldown/lane model. Note: an **NPC** casting Fireball is unaffected by this — that already uses a different, separately-designed pattern (recharge timer, e.g. `Fireball 6d6, recharge 3 Fate cycles` per the sample boss in the overview doc). |
| **Conjure Animals** | — *(summons make their own attacks/saves)* | Likely broken / do not use | Every summoned creature needs its own independent energy timer, multiplying one PC's action economy far beyond anything 5e's turn structure allows. Excluded from the T-Rex sim rather than resolved; matches open design question #6 from the original conversation ("Summons and companions: their independent timers can rapidly increase action economy"). **Partially resolved for the single-companion case** (Steel Defender, Find Familiar) — see `pulse_combat_system_overview.md` → Companions & Single Summons — but Conjure Animals' multi-creature case (up to 8 at once) hasn't been checked against that same construction yet. | Not fully designed, but a promising lead exists: if "one bonus-action command directs exactly one summoned creature" (the rule just adopted for single companions) holds here too, it would throttle the swarm the same way, without banning the spell outright. Still needs to be worked through and stress-tested before lifting the ban. |
| **Banishment** | Charisma | Needs review | Only ever covered generically, lumped into "control spells" alongside Hold Person in the overview doc's category table. Never individually simulated, so its specific edge cases (banishing summoned/extraplanar creatures possibly-permanently, its already-long base duration vs. the Fate-pause duration model) haven't been checked. | Tentatively inherits the Hold Person treatment (lasts until next Fate pause, single save, LR can negate) but this hasn't been stress-tested against Banishment specifically. |
| **Hypnotic Pattern** *(and similar AoE charm/incapacitate spells)* | Wisdom | Needs review | The first true **multi-target** control spell in this table — Hold Person and Banishment are single-target, but a 30-ft-cube save-or-charmed hits everyone who can see it at once, potentially several non-minions in the same cast. Two things the existing "control spells" treatment was never designed around: (1) does each affected non-minion get to spend its **own** LR independently to negate, meaning a well-rolled boss + lieutenants could all shrug it off, or does the spell only let one of them resist? (2) does a single cast risk neutralizing an entire multi-enemy encounter in one action, with no re-roll chance since it isn't concentration-ticked per creature? Also the first non-damaging AoE save looked at against **minions**: Flee, Mortals!'s Instant Death trait only triggers on a failed save against a *damage-dealing* effect (see Minions section, overview doc) — Hypnotic Pattern deals no damage, so a minion that fails its save is Charmed/Incapacitated like anything else, not instantly killed. First case of a minion surviving a failed save. | Tentatively inherits the Hold Person treatment (lasts until next Fate pause, single save, LR can negate) per affected creature, but the multi-target LR-spending question is untested and could make this spell either much stronger or much weaker than intended depending on the answer. |
| **Shield** | — | As-is | Only ever appears as an example reaction spell (25% energy cost, same bucket as Counterspell/opportunity attack). Never flagged as broken, never separately stress-tested either. | — |
| **Divine Smite** *(Paladin feature, not a spell, but consumes the same spell-slot resource)* | — | Adjusted (resolved) | Raised directly: "Paladin smite stacking during paralysis." In 5e, only weapon-attack turns limit smite stacking; Pulse's compressed real-time action economy plus a paralyzed (auto-crit-eligible) target could make stacking much worse than standard 5e. Deferred pending the Legendary Resistance ruling, then resolved once conditions got a general Fate-pause-bound rule. Bodett's **Ensnaring Strike** rides along on the same fix — same slot-on-hit pattern. | Bounded by the general Conditions rule (`pulse_combat_system_overview.md` → Conditions): a paralyzed target's window can't outlive the current Fate cycle. At current timings (~2 full actions/PC/cycle), a Paladin with Extra Attack can land up to 4 smitable hits in that window — allowed for now on the assumption the extra rolls make a second full action unlikely to actually land in time. Revisit note: consider an explicit per-cycle smite cap in the overview doc, the same way Fireball is trending toward an explicit token/cooldown limit rather than relying on slot count alone. Tracked for live-play validation in `pulse_combat_live_test_questions.md`. |
| **Healing Spirit** | — | Adjusted (resolved) | Initially framed as the same nova shape as Fireball, but the actual printed text already hard-caps total healing at `1 + spellcasting mod` (min 2) triggers before the spirit disappears — not an open tap. Re-examined and resolved rather than needing Fireball-style token/cooldown machinery. Found in Bodett's kit. | Place a physical stack of N chips (N = 1 + spellcasting mod, min 2) at the spirit's map location alongside its token. Any **visible creature — ally or enemy** — that enters its space or starts its turn there removes one chip and heals 1d6; spirit disappears at zero. RAW doesn't restrict this to allies ("a visible creature," no ownership language), and that's kept intentionally: an enemy diving through the spirit to heal itself or burn the party's charges is real contested-resource texture, not a bug — reverse this only as a deliberate house rule, not a Pulse fix. The walk-in/walk-out shuffle (draining the stack in one continuous move) is a pre-existing 5e table-ruling question, identical in Pulse and standard turn-based play — not something Pulse needs to solve. |
| **Tasha's Caustic Brew** | Dexterity | Needs review | Has a "redirect it each of your turns" maintenance mechanic. Technically already covered by the generic "spells with per-turn effects scale to Fate duration" category rule, but never individually verified against it. Found in Tes's kit. | Tentatively inherits the generic per-turn-effect rule; unverified. |
| **Breath of the Deep** *(3rd-party — Cthulhu by Torchlight)* | **None stated** | As-is | Source text (1 action, 120ft, V/S, concentration up to 10 min): 3d6 bludgeoning + can't speak/use verbal components, with **no attack roll or saving throw of any kind** — a guaranteed, fully unresisted damage-plus-silence effect. This is a 5e balance concern independent of Pulse (no counterplay at all for the target), and it's not clear the 5e team ever intended a no-save silence to exist — likely just a lower-power-book oversight or abbreviated write-up. Found in Arvin's kit. | **Ruled: play as written, no house-added save.** Not a Pulse-specific issue (the no-save gap is a 5e/source-book concern independent of this system), so no Pulse mechanic needed — leave the source text alone. |

## Related non-spell feature flagged alongside these

- **Rogue Sneak Attack burst** — *Resolved.* Raised in the same breath as Divine Smite stacking ("Paladin smite stacking during paralysis" and "rogue sneak attack burst") and deferred the same way. Doesn't consume spell slots, so it's out of scope for this doc's table, but the fix is now locked: Sneak Attack is capped at once per Fate cycle, regardless of action type (full action, bonus action, or reaction) — see `pulse_combat_system_overview.md` → Sneak Attack. Unlike Divine Smite, this isn't bounded by the Conditions rule (it isn't gated by the target's condition) — the actual exposure was that bonus actions and reactions refill much faster than the full-action bar, so a Rogue could otherwise stack Sneak Attack onto every qualifying hit in a cycle instead of just one.

## Character / party spell-list gaps

Grounded only where confirmed — no guessed spell lists.

- **Arvin** (Autognome — the Sorlock member of the "arach-neds" party, https://www.dndbeyond.com/characters/165658548). **Updated 2026-09-01** from `docs/chars/{Arvin,arvin-actions}.html` — party has leveled since the original 2026-08-21 pull; Arvin's Pact Magic slots moved from 2nd level to **3rd level**, implying **Warlock 5** now (Warlock Pact slots hit 3rd level at character level 5), Sorcerer level unconfirmed but no evidence of a change (still assumed 1) — this reading isn't independently verified against a class/level field, just inferred from the slot-level jump, so treat "Warlock 5 / Sorcerer 1" as a strong inference, not a confirmed fact.

  **Confirmed combat stats:** AC 16 (unchanged), Max HP **44** (up from 35), STR -1/DEX +3/CON +2/INT 0/WIS 0/CHA +3 (unchanged), Prof +3, proficient saves WIS +3 and CHA +6 (CHA save also gets +6 vs. paralyzed/poisoned specifically, an Autognome or Fathomless feature). Spell Attack +6 (unchanged). **Two separate Spell Save DCs, not an ambiguity** — the "14 15" was two different classes' DCs shown together: **Warlock spells use DC 14, Sorcerer spells use DC 15.** Weapons/attacks: Armblade (Dagger) +6 (1d4+3, thrown 20/60), Shocking Grasp +6 (2d8), Umbral Tendril +6 (2d8 at 1st slot, 4d8 upcast at 3rd via Pact), Eldritch Blast +6 (1d10, 2 beams), Finger Guns +6 (2d6, bonus action), **Tentacle of the Deeps: Attack** +6 (1d8+3, melee 10ft reach — the attack table's number; the feature text separately describes "1d8 cold damage" without the +3, worth reconciling which is actually used). Attacks per Action: 1.

  **Spell slots confirmed: Sorcerer 1st ×2, Pact Magic 3rd ×2** (Pact level up from 2nd).

  **Known spells — updated list, 32 entries now visible** (up from 26; some entries below are genuinely new, not just re-discovered):

  | Level | Spell | Source | Save? |
  |---|---|---|---|
  | Cantrip | Eldritch Blast | Warlock known | — (attack roll) |
  | Cantrip | Lightning Lure | Warlock known | Strength |
  | Cantrip | Confounding Shadows | Warlock known | Wisdom |
  | Cantrip | Bright Sparks | Sorcerer known | — |
  | Cantrip | Finger Guns | Sorcerer known | — (attack roll) |
  | Cantrip | Moment to Think | Sorcerer known | — |
  | Cantrip | Shocking Grasp | Sorcerer known | — (attack roll) |
  | Cantrip | Create Bonfire | Eldritch Invocations | Dexterity |
  | Cantrip | Shape Water | Eldritch Invocations | — |
  | Cantrip | Word of Radiance | Eldritch Invocations | Constitution |
  | Cantrip | Guidance | Magic Initiate (Cleric) | — |
  | Cantrip | Mending | Magic Initiate (Cleric) | — |
  | 1st | Armor of Agathys | Warlock known | — |
  | 1st | Arms of Hadar | Warlock known | Strength |
  | 1st | Hellish Rebuke | Warlock known | Dexterity |
  | 1st | Conjure Cover | Sorcerer known | — (3rd-party, Valda's Spire of Secrets; as-is) |
  | 1st | Umbral Tendril | Sorcerer known | — (3rd-party, Cthulhu by Torchlight; as-is) |
  | 1st | Find Familiar | Eldritch Invocations, ritual | — |
  | 1st | Tenser's Floating Disk | Eldritch Invocations, ritual | — |
  | 1st | Shield of Faith | Magic Initiate (Cleric) | — |
  | 1st | **False Life** *(new)* | Eldritch Invocations | — |
  | 2nd | Breath of the Deep | Warlock known | **None** *(As-is — ruled to play as written, see main table)* |
  | 2nd | Spider Climb | Warlock known | — |
  | 2nd | Alter Self | Graftling Alterations | — |
  | 2nd | Levitate | Eldritch Invocations | Constitution |
  | 3rd | **Summon Shadowspawn** *(new)* | Warlock known | — |

  Identify, Magic Mouth, and Skywrite (all present in the 2026-08-21 list) didn't appear in this extraction — non-combat utility spells, out of scope for this doc's purposes either way, not worth resolving further.

  All three previously-unconfirmed spells are still resolved with real source text: **Breath of the Deep** and **Umbral Tendril** (Cthulhu by Torchlight) and **Conjure Cover** (Valda's Spire of Secrets — the same 3rd-party book Elion's Polybrachia comes from). Umbral Tendril and Conjure Cover are both clean as-is; Breath of the Deep is ruled As-is (no house-added save) per the main table.

  None of these overlap the flagged-spell table above (no Fireball/Hold Person/Counterspell/Conjure Animals/Banishment/Shield/Divine Smite in his kit). One is directly relevant to an open question though: **Find Familiar** is a live, small-scale instance of the still-unresolved "summons get independent timers" problem (open design question #6, same root issue as Conjure Animals) — worth using as the first test case whenever that question gets picked back up.
- **Bodett** (Ranger 6, Swarmkeeper — the Ranger/Swarmkeeper member of the "arach-neds" party, per the export's correction "the druid is ranger/swarmkeeper" — parsed from a saved sheet at `docs/chars/Bodett.html`, 2026-08-21). **Confirmed combat stats** (from `docs/chars/bodett-actions.html`, 2026-09-01): AC 17, Max HP 53, STR -1/DEX +3/CON +2/INT -1/WIS +3/CHA +1, Prof +3, proficient saves STR +2 and DEX +6. Spell Save DC 14, Spell Attack +6. Weapons: Hand Crossbow ×2 (+8, 1d6+3, range 30/120, Crossbow Expert bonus-action extra shot), Whip (+6, 1d4+3, 10ft reach), Claws (+2, 1d6-1). Attacks per Action: 2. **Spell slots (confirmed 2026-09-01, level 6): 1st ×4, 2nd ×2** — matches the standard Ranger 6 half-caster table exactly. **Known spells (7):**

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

- **Tes** (Tesiahna "Tes" Dappledell, Artificer 6), **Elion** (Warlock 6, Hexblade — confirms this is the Hexblade/Pact-of-Blade Warlock from the export), **Loremi** (Loremi Psum, Barbarian 6, **Path of the Giant** — identified via the Thaumaturgy-granting "Giant's Power" subclass feature) — the rest of the "arach-neds" party, re-parsed from Spells-tab resaves at `docs/chars/{Tes,Elion,Loremi}.html`, 2026-08-21. Full lists now, superseding the earlier Actions-tab partial pull. **Party has since leveled to 6 across the board** (Bodett was already recorded at Ranger 6; Tes/Elion/Loremi bumped from 5→6 as of the 2026-09-01 actions-tab pull — Arvin's level is *not* confirmed to have changed, still recorded as Warlock 4/Sorcerer 1; worth confirming directly rather than assuming):

  **Confirmed combat stats** (from `docs/chars/{tes,eli,loremi}-actions.html`, 2026-09-01):
  - **Tes**: AC 16, Max HP **51** (corrects the earlier sim's placeholder assumption of 43 — the Monte Carlo results run against the Rat King trio used the wrong HP for Tes by 8 points; likely doesn't change the qualitative TPK finding given how lopsided it was, but worth a rerun if precision matters later). STR -1/DEX +2/CON +3/INT +5/WIS 0/CHA -1, Prof +3, proficient saves CON +6 and INT +8. Spell Save DC 16, Spell Attack +9 (1 higher than raw INT+prof — likely a +1 item bonus to attack rolls only). Weapons: Light Crossbow (+9, 1d8+6, range 80/320, Repeating Shot infusion), Dagger ×2 (+5, 1d4+2, thrown 20/60), Fire Bolt cantrip (+9, 2d10). Attacks per Action: 2. Also has a **Steel Defender companion** (AC 15, Speed 40ft, DEX +4/CON +5 saves, immune to poison/charmed/exhaustion/poisoned, Force-Empowered Rend attack) — resolved 2026-09-01: no independent timer, Tes commands it via her own bonus action (50% energy), same as any other bonus-action ability. See `pulse_combat_system_overview.md` → Companions & Single Summons. Not yet reflected in any sim run (it wasn't in scope when those ran), but structurally it can't add more than one extra attack per Tes's own bonus-action spend. **Spell slots (confirmed 2026-09-01, level 6): 1st ×4, 2nd ×2.**
  - **Elion**: AC 17, Max HP 34 (matches the sim). STR +2/DEX 0/CON +2/INT +1/WIS -1/CHA +5, Prof +3, proficient saves WIS +2 and CHA +8 (CHA save also gets a bonus vs. being charmed/magical sleep, per a feature not yet identified). Spell Save DC 16, Spell Attack +8. Weapons: Mind Blade (Hex Pact Weapon, +8, 1d6+5 plus a further 2d6 rider — likely Hexblade's Curse or a crit feature, not yet confirmed which), Warhammer (Hex Pact Weapon, +8, 1d8+5/1d10+5 versatile), Eldritch Blast (+8, 1d10+5, 2 beams). Attacks per Action: 1 (no Extra Attack). **Pact Magic slots (confirmed 2026-09-01, level 6): 0 at 1st, 0 at 2nd, 2 at 3rd** — the 1st-level tab seen earlier was invocation-granted at-will rituals (Detect Magic, Disguise Self), not slot-consuming; matches the standard Warlock 6 Pact Magic table (2 slots at 3rd level) exactly.
  - **Loremi**: AC 15, Max HP 64 (matches the sim). STR +3/DEX +2/CON +3/INT -1/WIS 0/CHA -1, Prof +3, proficient saves STR +6 and CON +6. No spellcasting DC, **0 spell slots** (Thaumaturgy is at-will, confirmed). Weapons: Dagger ×2 (+6, 1d4+5, thrown 20/60), Greataxe (+6, 1d12+3, Cleave), Handaxe ×2 (+6, 1d6+5, thrown 20/60), Javelin (+6, 1d6+5, thrown 30/120). Attacks per Action: 2. Has a limited-use subclass feature "Strike of the Giants: Frost Strike" (1d6 rider, 3 uses) not yet fully captured mechanically.
  All four sets of slot counts (Bodett 4/2, Tes 4/2, Elion 0/0/2, Loremi 0) independently match their class's standard 5e slot-progression table at level 6 — good cross-check that the level-6 read is correct and the earlier extraction wasn't off.

  **Tes (Artificer 6, prepared caster) — 13 spells:**

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

  **Elion (Warlock 6, Hexblade) — 10 spells.** Pure Warlock, so every known spell is cast from his single Pact Magic pool at his max slot level (3rd, at level 6) regardless of the spell's own base level — the same one-pool-per-caster-level mechanic behind the Sorc/Pact split found on Arvin's mat, just simpler here since there's no second class:

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

  **Loremi (Barbarian 6, Path of the Giant) — 1 spell:** Thaumaturgy (cantrip, no save, granted by the "Giant's Power" subclass feature).

  Cross-references against the flagged-spell table: **Elion has Counterspell** — confirms the already-resolved mechanic is in real use. **Tes has Shield** (matches the "As-is" row) and **Tes has Web** (matches Bodett — now two PCs know it, worth bumping up the "control spells" category-check priority). **Elion's Suggestion** (Wisdom save) is a charm/control spell not currently in the flagged table at all — same untested-category situation as Banishment.

  With Arvin as the Sorlock (above), this completes all 5 "arach-neds" party members: Bodett, Tes, Elion, Loremi, Arvin.
- **Level 2 sim party** — only spell ever pinned down was the wizard's Hold Person, and only to correct that it isn't available until character level 3 (already reflected in the Hold Person row above, not a new spell).
- **Level 8 sim party** — no specific PC spells were ever named in that sim.

## Next candidates to evaluate

Queue for the next pass, in rough priority order:
1. Conjure Animals fix-or-ban decision (currently a hard ban) — now has a promising lead (the "command via bonus action, no independent timer" rule that resolved Tes's Steel Defender and Find Familiar) but the multi-creature case still needs to be worked through before lifting the ban
2. Verify the generic "control spells" and "per-turn effects" category rules actually hold up for Banishment, Web (now 2 PCs), Suggestion, and Tasha's Caustic Brew — all currently just inherit an untested rule rather than being individually checked. **Hypnotic Pattern is the priority case here**: it's the first multi-target control spell, and the "does each non-minion spend its own LR independently" question needs an answer before this category can be called verified at all, not just for this one spell.
3. Revisit an explicit per-cycle Divine Smite cap in the overview doc using the same explicit-token approach Fireball just got (one shared token, full stop) — parked when Fireball was still open, now decoupled from it since Fireball resolved with a party-wide-token model rather than a cooldown/lane. Not urgent; Divine Smite already has an interim bound via the Conditions rule.

See also `pulse_combat_live_test_questions.md` for provisional rulings (the Conditions default, the Divine Smite 4-hit ceiling) that need validation at the table rather than more design work.
