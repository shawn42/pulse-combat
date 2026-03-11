## Pulse Combat System for 5e (PCS)

### Timer app
Web app for supporting PCS by managing individual timers, a shared fate timer, and syncronized pause/resume for all controlled by the DM. A local server running on a local wifi machine will enable all users to use either a laptop or phone browser to interact with their timers.

Three type of users: DM, Player, Shared view

DM uses GET /dm route
DM has a start button to start all timers
DM has a pause button to pause all timers
DM has a reset button to reset the entire combat (with confirmation dialog)
 - this clears all minions, monsters, and players, and resets the Fate timer

Fate timer panel:
 - timer duration, text box for number of seconds to recharge (defaults to 30)
 - an energy timer, starting full, and when timers are on, counts down to 0
   - when tapped will fill the bar, if tapped while full, it empties the bar
 - when this timer reaches 0
   - all timers pause
   - a banner displays on all pages (without requiring a refresh) that timers are paused
   - a Large Continue button appears
     - when pressed, refills the Fate timer and re-enables all timers

DM needs a form to add an NPC
an NPC requires a name, and to know if its a Monster or Minion

DM needs a Player Panel for each NPC

A Player Panel consists of:
 - timer duration, text box for number of seconds to recharge (defaults to 15)
 - an energy timer, starting at 0, and when timers are on, counts up to full
   - when tapped will fill the bar, if tapped while full, it empties the bar
 - Largest button: Action
   - only active if energy bar is 100% full
   - when tapped, sets the engergy bar to 0
 - Medium button: Bonus/Move
   - only active if energy bar is at least 50% full
   - when tapped, removes 50% of the total energy bar max
 - Medium button: React
   - only active if energy bar is at least 25% full
   - when tapped, removes 25% of the total energy bar max
 - DM only: a red remove link that removes the minion/NPC from the combat

Player uses GET /<playername> route
 - when page is hit, if <playername> isn't in the combat yet, it adds them
   - joining the combat reduces the energy timer duration for all non-minion NPCs by 1 second
 - shows the pause banner when DM has paused or the Fate timer caused a pause
 - page has a "read-only" live Fate timer
 - a single player panel for their character
 - a red leave combat button
   - when pressed, "unjoins" the named player from the combat
   - unjoining the combat increases the energy timer duration for all non-minion NPCs by 1 second
   - redirects to Shared View at /


Shared View uses GET / route
 - shows the pause banner when DM has paused or the Fate timer caused a pause
 - page has a "read-only" live Fate timer
 - page has a "read-only" live timers for all NPCs, minions, and players; grouped as such
 - at the bottom of the page, there is a text field and button that says "Join"
   - pressing join redirects you to /<playername> where playername is the value of the text field

Functionality notes: all timers must stay in sync with their values, starting, pausing, resuming.
Styling notes:
 - dark theme
 - animated timers
 - oversized buttons for easy tapping on mobile
 - on mobile should fill the screen as much as possible with little to no scrolling

