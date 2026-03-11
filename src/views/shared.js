// Shared utilities for all views (served at /shared.js)
// lerp, lerpState, connect, animate

function lerp(a, b, t) { return a + (b - a) * t }

function lerpState(a, b, t) {
  if (!a) return b
  return {
    ...b,
    fate: { ...b.fate, current: lerp(a.fate.current, b.fate.current, t) },
    entities: b.entities.map(e => {
      const ea = a.entities.find(x => x.id === e.id)
      if (!ea) return e
      if (!ea.timer || !e.timer) return e
      return { ...e, timer: { ...e.timer, current: lerp(ea.timer.current, e.timer.current, t) } }
    })
  }
}

// connect(onState) — sets up WebSocket with reconnect logic, calls onState(data) on each state tick.
// Returns a getter for the current WebSocket so views can call send().
function connect(onState) {
  let ws
  let prevState = null, nextState = null, lastTick = 0

  function doConnect() {
    ws = new WebSocket('ws://' + location.host + '/ws')
    ws.onmessage = function(e) {
      let m
      try { m = JSON.parse(e.data) } catch { return }
      if (m.type === 'state') {
        prevState = nextState ?? m.data
        nextState = m.data
        lastTick = performance.now()
      }
    }
    ws.onclose = function() { setTimeout(doConnect, 1000) }
  }

  doConnect()

  function getInterpolatedState() {
    if (!nextState) return null
    const alpha = Math.min(1, (performance.now() - lastTick) / 100)
    return lerpState(prevState, nextState, alpha)
  }

  function getWs() { return ws }

  onState(getInterpolatedState)

  return getWs
}

// animate(getState, render) — rAF loop that calls render with interpolated state each frame.
function animate(getState, render) {
  function frame() {
    const state = getState()
    if (state) render(state)
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
