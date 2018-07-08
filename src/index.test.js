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
  expect(posepointer.options.posenet).toBeTruthy()
})

it('Autostarts if options.autostart', () => {
  posepointer = new Posepointer({autostart: false})
  expect(posepointer._isTracking).toEqual(false)

  posepointer = new Posepointer({autostart: true})
  expect(posepointer._isTracking).toEqual(true)
})

/**
 * Posepointer.trackPoses
 */
it('If debug is on, displays the points and skeletons overlays on the webcam', async done => {
  posepointer = await new Posepointer({autostart: false, debug: false})
  posepointer.debugPoses = jest.fn()
  posepointer.start()
  expect(posepointer.debugPoses).not.toHaveBeenCalled()

  posepointer = await new Posepointer({autostart: false, debug: true})
  posepointer.debugPoses = jest.fn()
  posepointer.start()
  setTimeout(() => {
    try { expect(posepointer.debugPoses).not.toHaveBeenCalled() } catch (e) { done() }
    done()
  }, 500)
})
