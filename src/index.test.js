const stubs = require('./jest-polyfills')
const Posepointer = require('./index')
let posepointer = null

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  stubs.mediaDevices.unsupport()
  try {posepointer = new Posepointer()} catch (e) {}
  expect(posepointer).toBeFalsy()

  // Set mediaDevices and try again
  stubs.mediaDevices.support()
  stubs.WebGL.support()
  posepointer = new Posepointer()
  expect(posepointer).toBeTruthy()
})

it('Sanitizes options and sets sane defaults', () => {
  posepointer = new Posepointer()
  expect(posepointer.options).toBeTruthy()
})

it('Autostarts if options.autostart or if PoseNet has already initialized', () => {
  posepointer = new Posepointer({autostart: false})
  expect(posepointer._isTracking).toEqual(false)

  posepointer = new Posepointer({autostart: true})
  expect(posepointer._isTracking).toEqual(true)
})
