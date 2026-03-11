// Sets up demo data for screenshots
const BASE = 'http://localhost:3000'
const WS_URL = 'ws://localhost:3000/ws'

function send(ws: WebSocket, msg: object) {
  ws.send(JSON.stringify(msg))
}

function waitForState(ws: WebSocket): Promise<any> {
  return new Promise(resolve => {
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data)
      if (m.type === 'state') resolve(m.data)
    }
  })
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

const ws = new WebSocket(WS_URL)

ws.onopen = async () => {
  console.log('Connected')

  // Reset
  send(ws, { type: 'dm:reset' })
  await sleep(200)

  // Add players via HTTP (as the join screen would)
  for (const name of ['Aragorn', 'Legolas', 'Gimli']) {
    await fetch(`${BASE}/player/${name}`)
    console.log(`Added player: ${name}`)
    await sleep(100)
  }

  // Start combat — NPCs added after this get full energy
  send(ws, { type: 'dm:start' })
  await sleep(200)

  // Add NPCs (full energy since combat is running)
  send(ws, { type: 'dm:addNPC', name: 'Orc Warlord', npcType: 'monster' })
  await sleep(100)
  send(ws, { type: 'dm:addNPC', name: 'Cave Troll', npcType: 'monster' })
  await sleep(100)
  send(ws, { type: 'dm:addNPC', name: 'Orc Scout', npcType: 'minion' })
  await sleep(100)
  send(ws, { type: 'dm:addNPC', name: 'Orc Scout II', npcType: 'minion' })
  await sleep(100)

  // Wait ~7s so player bars are partially filled (~46%)
  console.log('Waiting for timers to fill...')
  await sleep(7000)

  // Get current state to find entity IDs
  send(ws, { type: 'dm:pause' })
  await sleep(200)
  const state: any = await waitForState(ws)

  // Fill Legolas to full (ready to act) and Cave Troll spent (tapped to 0)
  const legolas = state.entities.find((e: any) => e.name === 'Legolas')
  const troll = state.entities.find((e: any) => e.name === 'Cave Troll')

  if (legolas) { send(ws, { type: 'tap:energy', id: legolas.id }); await sleep(100) }
  if (troll)   { send(ws, { type: 'tap:energy', id: troll.id });   await sleep(100) }

  // Resume
  send(ws, { type: 'dm:start' })

  console.log('\nReady to screenshot!')
  console.log('  DM view:     http://localhost:3000/dm')
  console.log('  Player view: http://localhost:3000/player/Aragorn')
  console.log('  Join screen: http://localhost:3000')

  ws.close()
  process.exit(0)
}

ws.onerror = (e) => { console.error('WS error', e); process.exit(1) }
