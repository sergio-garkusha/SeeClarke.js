/**
 * Demo entry point
 */
// Basic styles
require('../assets/styles/index.scss')

/**
 * DEMO 1: This is all you need!
 * - Features: autostart, emit events, position default cursor
 *  in multi-user mode
 *
 * Please note: The alternative syntax would be:
 * let options = {}
 * const SeeClarke = require('../src/SeeClarke.js')
 * const seeclarke = new SeeClarke(options)
 */
window.seeclarke = new (SeeClarke)({autostart: true, debug: true})

const $pointer = document.getElementById('pointer')
const $depthCircle = document.getElementById('pointer-depth-circle')

window.addEventListener('onSeeClarkePoseUpdates', (ev) => {
  let context = ev.detail.context
  $depthCircle.style.display = $pointer.style.display = 'block'
  $depthCircle.style.borderRadius = $depthCircle.style.left = $pointer.style.left = context.poses[0].pointedAt.x + 'px'
  $depthCircle.style.top = $pointer.style.top = context.poses[0].pointedAt.y + 'px'

  $depthCircle.style.height = $depthCircle.style.width = context.poses[0].pointedAt.z * 0.25 + 'px'
  $depthCircle.style.marginLeft = -context.poses[0].pointedAt.z / 2 * 0.25 + 'px'
  $depthCircle.style.marginTop = -context.poses[0].pointedAt.z / 2 * 0.25 + 'px'
}, true)
