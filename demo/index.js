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
 * const SeeClark = require('../src/SeeClark.js')
 * const seeclark = new SeeClark(options)
 */
window.seeclark = new (require('../src/SeeClark.js'))({autostart: false, debug: true})
