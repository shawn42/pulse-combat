# Chaos Pulse Combat System — Conversation Export

> **Scope note:** This export contains the user-visible conversation content available in this chat context. I cannot expose hidden system instructions, private chain-of-thought, internal tool traces, or other hidden context.

---

## User
You are a skilled DND 5e DM and an expert in game design and fun table top games. I'd like to design a replacement for 5e combat (or settle for a fun mini game) that is essentially real time. Players get an action based on a cool down timer. Once they take their action the cool down timer resets and they must wait. Some ideas I had: bonus actions or movement could cost something like half an action. Monsters hp could be beads on a monster placard of some kind. Players could have a simplified char placard for this mode that has simplified dice role rules but still loosely based on 5e rules. Buffs/de buffs would have to be tokens thrown on npcs and pcs to be visible to other players, with clear markings to speed up play. When an NPC dies, it's loot could be cards tossed on the table face down so investigating and looting interrupts combat for that player. Problems I see: the DM would have way too much to do in too little of time. They may need the ability to pause cool down timers to allow for some sort of DM planning or lair actions. Targeting and movement could be quite tricky, I suggest changing spells to fall under distance categories of touch, near, far. Can we pull this off and still make it fun?

## User
Simplify the timer. Simple phone app with a timer that fills in N seconds and an action would drain all N. Movement or bonus action only drain half N. Possible decrease N based on primary stat or dex?

## User
Would it be worth it to limit spells with tokens or some such instead of penalizing based on level? Something like: you only GET 2 casts of fireball?

## User
I like where this is headed. Is there a simple mechanic we're missing that encourages less spam and more paying attention to what other players are doing? If not, keep what we have and test if this breaks paladins and sorcerers. Keep in mind that something like counter spell would be problematic but potentially amazing.

## User
Keep counter spell at a reaction, I don't like 3 tiers for times, but 4 is too many. Before we build a sample encounter, how boring will this be for a fighter or barb that is just swinging their axe every N seconds?

## User
Momentum sounds too hard to track real time. What if we A, we given martials a bonus to attacking someone that was just damaged... Maybe an extra d4 or something? And /or B, I forgot what B was..

## User
I like exposed condition, it seems too hard to manage with tokens. Let's just let players track if that enemy was just hit or not and trust them to do the right thing.

## User
I remembered B, simple minions that pop on single hits, with rollover damage to all minions of the same kind. Now lock in the rules and write a single page summary. Run a sample encounter as described above making sure to print out all the char and NPC info as well as the results and balance recommendations

## User
Let's see if we can even the odds. I like all your suggestions. Let's add a pause timer call it "the fates". Every say 20s, the timer automatically triggers and pauses all players. The DM gets a chance to make a few attacks or move or narrate and can resume chaos mode. I'm open to other ideas, but otherwise the DM will just be overwhelmed by literal action economy of all the players going faster than they can keep up. I like fixed rules for how or what to attack or behave, but I'm trying to avoid too much fancy tech (like monster AI)

## User
I want NPCs and PCs to use the same energy system if possible. During the fates, I'd like all energy bars to stop refilling (including monsters). The fates is just to make sure the DM gets extra time, but is still real time. Likewise all reactions would be allowed if enough energy. Let's run another sim with these new rules

## User
I was going to suggest a progressive fight: lieutenant and minions, then boss shows up with a few more minions. Please simulate. Also, any thoughts on how to speed up the attack + Prof mod + x mod vs AC checks? Also, how to handle spells with save DCs, the conversation back and forth would get in the way.

## User
Yes. Another thought I had on tokens, the spell token may flip for the effect. Hold person token flips to be the stunned condition or what have you. I also think player N should start at 15s.

## User
1) do players have beads for health that the DM is stealing? 2) is it feasible to have 140 beads on the table for the boss health? 3) I'm envisioning placards and a map, but no grid. But still tactile minis moved around for clarity. Also, do your 1-3 above.

## User
Yes

## User
I think the custom timer(s) with global pause every X secs and DM ability to I pause could be a very simple webpage. Please build it. I will initially host it locally and all on my wifi can connect. The DM will need to have N timers, 1 for each monster and minion group.

## User
Full local won't work, each player needs to be able to use their own device, and maybe show all timers on a shared screen in the room

## User
Yes, bit make sure the clients have a name, button for 100, 50, 25 labeled action, move/bonus, and reaction respectively. Also the ability to easily set/modify the full timer duration

## User
No. Given your vast knowledge of spells, feats,.and abilities, what problems are going to come up that we haven't addressed yet?

## User
Sure. I'll save it for later.

## User
Ready action isn't really needed. They just ready it in their mind and wait for the condition to happen. Sneak attack, make it easy to happen, but given them tokens like we do for spells. Death saves in the fate only. Let's build a succinct spells table for all known spells. Each will be, as-is, meaning it plays basically the same eg fireball or should not be used in this system as they are breaking, or third needs heavy adjustment. If adjusted, a summary of the adjustment we've discussed or a simple attempt at making it playable.

## User
One tweak, if multiple players try to counterspell, if any succeed, the spell is stopped, but ALL players that counterspelled lose a token for it. One question I have: do all spell effects that last til start of your next turn or start of their turn type of timings just last til the next Pulse? Also, should we make the Fate timer about 2x the standard timer? So the Fate timer would now be 15sx2=30s Run a simulation to verify it still works.

## User
1) You didn't have any players act until their full 15s, do any of them have enhanced dex to lower their charge time? 2) I was thinking the same thing, any NPC introduced during a Fate (so all except the initial wave) enter combat with full timers. Let's run the simulation again with that setup and see how we fair. 3) What do you think of the idea that monsters energy bar fills every (N - num PCs) where N is the standard starting energy rate for PCs?

## User
In your sim, did you lower the Lieutenant's energy rate by party size as well?

## User
The rule should apply to all non-minions.

## User
How does that simulation go if the wizard lands their hold person? Also, minions have timers, they just don't get them shortened by party size.

## User
What's the CR of these two mobs and in standard 5e what would you estimate the lethality of this encounter?

## User
Let's look at: "Paladin smite stacking during paralysis" and "rogue sneak attack burst". Does it make sense to combine them or do them individually?

## User
Eval the legendary resistance first. Lots of little rule changes for every spell or ability will complicate a lot of things.

## User
LR should cost energy too, so it at least does something to try to hold person. Maybe half an energy bar?

## User
Yes.

## User
I'd like to: Build a stress test “Full Party Nova + 2 Bosses + Minions”, but first please generate a well formatted PDF to download that succinctly explaining the why behind this system and how it all works (assuming the target audience knows 5e well) Including the most succinct spell breakdown from earlier.

## User
How do I setup / run the server you built earlier? I have server.js in the root and index.html in a public folder.

## User
Let's update the html and server to have all timers at / (including the Fate timer at the top) at /dm show fate timer and timers for all players, if tapped the players timer fills, if already full, it empties. The DM will see the standard controls for their mobs and minions, their energy refill time populated correctly based on party size. The DM can add mobs or minions on this screen as well. There is a start/reset ability on this page (timers DO NOT automatically start), and a start/pause button. The start button starts all timers, including the Fate timer. When the Fate timer is up, all other timers are automatically paused and a large continue button appears at the top of the DM screen. At /<playername> playername will be added to the party if they do not exist. Players see all timers with names only but no controls. They get a larger view of their own timer and buttons for Action, Move/Bonus, React. Make their sizes relative to the amount of energy they burn. When the player is added to the party, their timer should show up on all screens automatically without a refresh. When paused, an alert banner of some kind should show that timers are paused (but using buttons to spend energy should not be locked).

## User
Yes and include an index that has all the shared summary info

## User
Yes, add those three upgrades. Also, players need to be able to modify their "max energy" and the defaults should all be 15s. Buttons should be disabled unless they have enough energy to do them.

## User
buttons on the player screen never enable!

## User
Ignore the timer app. Let's use the latest rules to run a simulation of chars at level 2 with properly adjusted LT and Boss

## User
Wizards do not get Hold Person until level 3, redo with a proper spell list. And assume this boss doesn't have a LR

## User
Yes, keep going. I fear a TPK because of the tankiness of the boss. How was health determined?

## User
Yes. Also, what would you consider the CR to be for the boss and LT in this scenario?

## User
No. Let's add a rule that non-minions get (CR/3) number of LR and scale an encounter up for level 8 PCs.

## User
Run the full sim to either A) all monsters are dead or B) TPK. Prioritize healing/getting PCs back up when down (allow for bonus action potions, say 1 per PC).

## User
Did the minions ever get to attack? When they get brought in during the Fate, they will get immediate attacks because their energy is full. the NPCs get to attack during the Fate using the energy they have.

## User
Yes and please print out the stat blocks/abilities of the LT and Boss

## User
Please reference back to the summary PDF you created earlier. Please update it with changes to the system made since then.

## Assistant
### Chaos Pulse Combat System – Updated Summary

**Core concept:** Chaos Pulse replaces turn-based initiative with continuously refilling energy bars. A full action costs 100% energy; movement or a bonus action costs 50%; a reaction costs 25%.

**Default PC energy:** 15 seconds.

**Fate:** Every 30 seconds by default, the Fate timer triggers. All energy refill stops, creating a real-time management window for the DM. NPCs may spend energy they already possess. Newly introduced NPCs enter with full energy.

**Enemy refill:** Non-minions use the party-size adjustment, expressed during design as `max(10, Base - # PCs)`. Minions retain the normal base refill rate.

**Legendary Resistance:** Non-minions receive approximately `floor(CR / 3)` uses, with each use costing 50% of that creature's energy.

**Minions:** Have timers, but do not receive the party-size refill reduction. They can be designed to die in one or a few hits, with excess/rollover damage carrying into other minions of the same kind.

**Ready actions:** Not required as a formal action; players may simply hold energy and react when their chosen condition occurs.

**Sneak Attack:** Intended to be easy to trigger in this system and may use tokens.

**Counterspell:** Uses reaction energy and a spell token. If multiple players counterspell the same spell and any succeeds, the spell is stopped, but every counterspeller spends their token.

**Turn-based durations:** Effects expressed as lasting until the start/end of a creature's next turn were proposed to last until the next Pulse.

**Physical presentation:** Gridless map, tactile miniatures, visible placards, HP beads, and condition/effect tokens. Spell tokens may flip to show the resulting condition or effect.

---

## User
How would you define what a pulse is in this system?

## Assistant
A Pulse was initially defined as a discrete resolution point replacing the conventional turn: actors with sufficient/full energy could act, and effects tied to turn boundaries could expire at the next Pulse.

---

## User
Sure, maybe with an example of a spell or effect that lasts "until the next pulse"?

## Assistant
Example: Alice casts *Hold Person* during Pulse 1. The target is paralyzed for the remainder of that Pulse. At the start of Pulse 2, the effect ends, replacing the need to track “until the start of its next turn.”

---

## User
Yes, if it meets the needs use mermaid for your diagrams.

## Assistant
An initial Mermaid Gantt attempt was provided but did not render correctly.

## User
Your syntax for mermaid isn't working.

## Assistant
A correction was made using Mermaid sequence and timeline diagrams, along with the clarification that Gantt was a poor fit for overlapping energy bars and discrete Pulse markers.

---

## User
New sim: Tyrannosaurus Rex vs a level 5 party: barbarian, sorlock, pact of the blade warlock, artificer, and druid.

## Assistant
A first-pass simulation was attempted using generic level-5 assumptions, but the assumed spell lists and party builds were later corrected.

---

## User
No fireball and no conjure animals. The druid is ranger / swarmkeeper, the warlock is hexblade, The actual character sheets are here: [five D&D Beyond character links]. This group is known as the arach-neds. How would they work in the pulse combat system against the t-rex?

## Assistant
A generic analysis was provided because the character sheets could not be reliably read from the linked pages. The party composition was treated as:

- Barbarian
- Sorlock
- Hexblade / Pact of the Blade Warlock
- Artificer
- Ranger / Swarmkeeper

The standard T-Rex baseline used:

- AC 13
- HP 136
- Bite: +10 to hit, 4d12+7 average 33, grapples/restrains
- Tail: +10 to hit, 3d8+7 average 20
- CR 8

The first rough result suggested the T-Rex would die in approximately two major damage cycles because the party's simultaneous action economy strongly favors them.

---

## User
Questions: 1) How would PCs handle legendary actions? Does the DM just get to use them whenever? 2) What would we need to add to this encounter to make it more evenly balanced that would be on theme for a party in dense jungle on a large island where bad guys have camped on the far side of the island? Also, add into your calculations that the sorlock has -4 to all rolls due to exhaustion.

## Assistant
Legendary actions were discussed as an action-economy correction. Two concepts were proposed:

1. Legendary actions could cost partial energy, such as 25%.
2. A cleaner Pulse-native alternative is often simply giving a boss a shorter energy cycle rather than adding a separate legendary-action subsystem.

The Sorlock's -4 exhaustion penalty was incorporated into later rough calculations as a significant reduction in accuracy and effectiveness.

Jungle encounter additions proposed included:

- Dense foliage and limited sight lines
- Difficult terrain
- Ambush opportunities
- Raptor/deinonychus support creatures
- A tougher Alpha Rex
- Environmental hazards such as unstable ground, vines, spores, or falling debris
- A narrative connection to the hostile camp, such as the Rex being a guard beast or attracted by the battle

---

## User
build the alpha jungle rex stat block then simulate the upgraded fight

## Assistant
# Alpha Jungle Rex

*Huge beast, unaligned*

- **Suggested Chaos CR:** 9
- **HP:** 180
- **AC:** 14
- **Speed:** 50 ft.
- **Energy:** 10 seconds
- **Legendary Resistance:** 3 uses in the then-current draft; each costs 50% energy

### Multiattack
- **Bite:** +10 to hit, 4d12+7 piercing; grapple/restrain on hit.
- **Tail:** +10 to hit, 3d8+7 bludgeoning.

### Jungle Ambush
While concealed in dense foliage, the first attack benefits from ambush advantage.

### Terrifying Roar
Costs 50% energy. Creatures in a 30-foot cone make a Wisdom save or become frightened until the next Pulse.

### Crushing Clamp
Reaction costing 25% energy when a grappled creature attempts escape; deals 2d8+7 damage.

### Blood Frenzy
Below 90 HP:
- +2 damage to attacks
- Energy N reduced to 8 seconds

### Supporting creatures
Three deinonychus/raptor-style creatures were added with Pack Tactics.

### Rough simulation result
The fight was projected to last about three major damage cycles. The Sorlock was likely to be down or badly injured, the Artificer heavily pressured, and the Rex killed around the third cycle, while surviving raptors could continue to threaten the wounded party.

---

## User
When bringing in a standard char into PCS, how do you decide how many tokens of each thing to give? Fireball for instance, if they have 3 3rd level spell slots, they could theoretically cast 3 fireballs. Should they get 3 FB tokens? What if they want to cast hold person with one of their slots? We could have the players "cache in their spell slots for tokens before combat; it feels slightly unfair to make them choose before they are fighting. Maybe they have 3 FB tokens, but place them into 3 slots for "big spells" on their placard. Once those are full, they can't cast any more big spells? Any other ideas on this front?

## Assistant
Several approaches were explored:

### Tier-bucket tokens
Convert slots into flexible tokens by spell level/tier. A player spends a third-level token on *Fireball*, *Counterspell*, or another eligible spell, without pre-committing before combat.

### Per-spell cooldown
A proposed anti-spam rule was that a leveled spell could not be cast in consecutive Pulses.

### Big-spell lane
A separate track could limit how many major spells are fired within a short combat window.

### Escalating cost or cooldown
Repeated use of the same spell could increase energy cost or impose a cooldown.

The user remained unconvinced about abandoning spell-specific tokens entirely.

---

## User
I'm not sold on switching to slots entirely, but go ahead and design a placard layout that makes tracking intuitive

## Assistant
A spellcaster placard concept included:

- HP and energy at the top
- Concentration indicator
- Tier/token tracks
- A recent-spell or cooldown area
- Optional big-spell lane
- Concentration strip
- Physical token colors for different resource categories

The key design objective was flexibility without requiring players to pre-guess which spells they would need.

---

## User
If a player does a spell that requires like 4 NPCs to make strength saves, how do you do that quickly without blocking the DMs time?

## Assistant
Options discussed:

1. **Passive saves:** `10 + save modifier`, compared directly to spell DC.
2. **Group save roll:** one roll for identical creatures.
3. **Roll all dice simultaneously:** useful when individual outcomes matter.
4. **Save bands:** automatic success/failure at extremes, with rolling only near the threshold.

A hybrid was recommended:
- Minions: passive saves or one group roll
- Identical creatures: group resolution
- Bosses: normal roll and/or Legendary Resistance

---

## User
To speed up saves, checks, and attacks. What lookup tables or info could be on NPC and PC placards?

## Assistant
The placard was reframed as the combat UI. Suggested information included:

### PC placard
- Precalculated attack bonuses and/or required rolls against the current enemy AC
- Spell save DC
- Average damage beside dice
- Condition cheat strip
- Energy tracker
- Resource/token tracks
- Advantage/disadvantage reminder
- Exhaustion penalty prominently displayed

### NPC placard
- AC and HP
- Passive saves
- Party attack reference
- Condition immunities
- HP thresholds such as bloodied/enrage
- Energy/reaction/LR tracks
- Group-save shortcuts for identical enemies

---

## User
I don't understand "Vs +7 attacks: hit on 9+"

## Assistant
Clarification:

For AC 16 and an attack bonus of +7:

`d20 + 7 >= 16`

Therefore:

`d20 >= 9`

So “+7 attacks hit on 9+” simply means the subtraction has been precomputed.

---

## User
Redesign

## Assistant
The placard was redesigned around encounter-start preparation:

### Player
```text
TARGET AC: ______

ATTACKS
Longsword (+7) -> Need: ______
Eldritch Blast (+8) -> Need: ______
Crossbow (+6) -> Need: ______
```

Players calculate the required die result once per enemy AC instead of during every attack.

### Saves
Spell DC remains visible, while NPC placards display passive save numbers for rapid comparison.

### Resources
Visible energy, reaction, spell/resource, and special ability tracks.

### Conditions
A compact reminder strip.

### NPC
AC, HP, passive saves, save mode, HP thresholds, energy, reactions, LR, and optional party attack profile.

---

## User
C

## Assistant
The user chose **C: Hybrid — 5e compatible but UI optimized**.

The resulting philosophy:

> Preserve 5e math and character compatibility. Move arithmetic and lookup work outside the real-time action window.

The player placard concept became:

- Encounter AC field
- Attack bonuses plus precomputed “need” numbers
- Spell save DC
- Visible resources
- Advantage/disadvantage reminder
- Prominent exhaustion penalty when applicable

The NPC placard concept became:

- AC/HP
- Passive saves
- Optional roll/passive mode
- HP thresholds
- Energy/reaction/LR tracking

For multi-target saves:
- Minions: passive saves
- Identical creatures: group resolution
- Bosses: individual rolls or LR

---

# Current Working Rules Snapshot

This is a consolidated snapshot of the rules that emerged from the discussion. Some items remain explicitly experimental and should be stress-tested.

## Energy
- Default PC maximum/recharge cycle: **15 seconds**.
- Full Action: **100% energy**.
- Move or Bonus Action: **50% energy**.
- Reaction: **25% energy**.
- Energy refills continuously during normal combat.
- Actors may hold energy rather than immediately spend it.

## Fate
- Default Fate interval: **30 seconds**, approximately twice the default PC energy cycle.
- When Fate triggers, energy refill pauses for everyone.
- Fate creates a real-time DM management window.
- NPCs can spend energy they already have.
- Reactions remain possible if sufficient energy is available.
- NPCs introduced during Fate enter with full energy.

## Enemy recharge
- Non-minions use the party-size adjustment concept:
  `max(10 seconds, Base N - number of PCs)`.
- Minions do not receive this reduction and use their normal base recharge.

## Legendary Resistance
- Proposed baseline: `floor(CR / 3)` uses for non-minions.
- Each use costs **50% of the creature's energy**.

## Minions
- Have their own timers.
- Often use very low HP / one-hit design.
- Excess damage may roll over into other minions of the same type.
- Group saves or passive saves are preferred to reduce DM workload.

## Pulse
A Pulse is currently best understood as a **shared resolution boundary**, not another timer that forces everyone to act every 15 seconds. It is useful for:

- Ending simplified “until next turn” effects
- Resolving certain synchronized conditions
- Providing a shared temporal reference

The exact relationship between Pulse boundaries and the continuous energy system remains an area worth tightening, because treating every actor as acting only once per Pulse would undermine the continuous recharge concept.

## Durations
A proposed simplification:
- Effects written in 5e as lasting until the start/end of a creature's next turn may instead last **until the next Pulse**.

## Ready
- No formal Ready action required.
- Players can retain energy and spend it when their intended trigger occurs.

## Counterspell
- Uses reaction energy.
- Uses a Counterspell token/resource.
- If multiple creatures attempt Counterspell and any succeeds, the spell is stopped.
- All creatures that attempted Counterspell spend their token.

## Spell/resource design
Still under active design. Candidate model:

- Flexible spell-level or tier resource pools preserve slot flexibility.
- Spell-specific tokens may still exist for high-impact or system-problematic spells.
- Optional one-Pulse cooldowns or major-spell lanes can reduce repeated nova/spam.
- Avoid forcing players to pre-select their entire spell loadout before knowing the encounter.

## Physical table design
- Gridless tactical map
- Miniatures for spatial clarity
- Player and NPC placards
- HP beads or counters
- Physical condition tokens
- Flip tokens where a spell token can become the visible effect token
- Face-down loot cards that create a deliberate choice between looting and continuing combat

## Resolution acceleration
### Attacks
Precompute the required d20 result against the current target AC.

### Saves
Use passive saves for speed where appropriate:
`Passive Save = 10 + save modifier`.

### Multi-target effects
- One group roll for identical creatures, or
- Passive comparison, especially for minions.

### Bosses
Retain individual rolls when drama or uncertainty is valuable.

---

# Design Questions Still Open

1. **Exact Pulse definition:** Is Pulse a fixed global event, a shared effect-expiration boundary, or tied to Fate?
2. **Spell token economy:** How much flexibility should spell-level pools retain versus spell-specific tokens?
3. **Repeated spell limits:** Cooldown, escalating energy cost, major-spell lanes, or another mechanism?
4. **Legendary actions:** Separate partial-energy actions versus simply faster boss energy cycles.
5. **Boss scaling:** How much HP and recharge reduction is needed before the system feels dangerous without becoming a TPK engine?
6. **Summons and companions:** Their independent timers can rapidly increase action economy.
7. **Turn-dependent class abilities:** More stress testing is needed for Sneak Attack, Smite, Action Surge, metamagic, Extra Attack, concentration, and similar features.
8. **Death saves:** Current proposal is to resolve them during Fate.
9. **Simultaneous effects:** A formal tie-breaking/resolution priority may still be needed for conflicting actions.

---

# Design Philosophy

The strongest through-line of the conversation is:

> **Chaos Pulse should remain recognizably D&D 5e, but its combat interface should be rebuilt for real-time play.**

The system should preserve:
- recognizable characters
- AC
- attack bonuses
- spell save DCs
- familiar spells and class abilities where possible

While replacing:
- initiative turns
- repeated arithmetic
- excessive DM dice rolling
- hidden state
- slow condition tracking

With:
- continuous energy
- a Fate management interruption
- placards
- tokens
- passive/group resolution
- visible shared state
- precomputed lookup information

