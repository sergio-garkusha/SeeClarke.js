/**
 * # SeeClark.test.js
  # IMPORTANT TESTING NOTES
  =========================
  - Take care to properly test async methods with awaits, otherwise you may be
    doing edge-case things like checking the truthyness on a Promise object
  - [ ] @TODO We're not testing canvas elements yet. It's seems possible via e2e
  testing though, so we'll absolutely want to test that considering inference
  depends on that!
*/
const STUBS = require('../mock/jest-polyfills')
const SeeClark = require('./SeeClark')
let seeclark = null

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  STUBS.mediaDevices.unsupport()
  try {seeclark = new SeeClark()} catch (e) {}
  expect(seeclark).toBeFalsy()

  // Set mediaDevices and try again
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  seeclark = new SeeClark()
  expect(seeclark).toBeTruthy()
})

it('Sanitizes options and sets sane defaults', () => {
  seeclark = new SeeClark()
  expect(seeclark.options.posenet).toBeTruthy()
})

it('Autostarts if options.autostart', () => {
  seeclark = new SeeClark({autostart: false})
  expect(seeclark._isTracking).toEqual(false)

  seeclark = new SeeClark({autostart: true})
  expect(seeclark._isTracking).toEqual(true)
})

/**
 * SeeClark.trackPoses
 */
it('If debug is on, displays the points and skeletons overlays on the webcam', () => {
  seeclark = new SeeClark({autostart: false, debug: false})
  // Mock debugPoses; we're testing individual draw methods in other tests
  seeclark.debugPoses = jest.fn()
  seeclark.trackPoses([])
  expect(seeclark.debugPoses).not.toHaveBeenCalled()

  seeclark.debug = true
  seeclark.trackPoses([])
  expect(seeclark.debugPoses).toHaveBeenCalled()
})

// it('Automatically adjusts algorithm to match "single" or "multiple mode"', () => {
//   seeclark = new SeeClark({autostart: false, debug: true, posenet: {maxUsers: 1}})
//   seeclark.debugPoses = jest.fn()
//   seeclark.posenet = {
//   }
//   expect(true).toBeTruthy()
//   // seeclark.trackPoses()
//   // expect(seeclark.debugPoses).toHaveBeenCalled()
// })
