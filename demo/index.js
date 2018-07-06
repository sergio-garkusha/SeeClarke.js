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
 * const PosePointer = require('../src/index.js')
 * const posepointer = new PosePointer(options)
 */
window.posepointer = new (require('../src/index.js'))
