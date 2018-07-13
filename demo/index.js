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
window.seeclarke = new (require('../src/SeeClarke.js'))({autostart: true, debug: true})

let $pointer = document.getElementById('pointer')
window.addEventListener('onSeeClarkePoseUpdates', (ev) => {
  let context = ev.detail.context
  $pointer.style.display = 'block'
  $pointer.style.left = context.poses[0].pointedAt.x + 'px'
  $pointer.style.top = context.poses[0].pointedAt.y + 'px'
}, true)
