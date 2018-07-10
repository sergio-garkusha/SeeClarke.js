/**
 * # SeeClarke.test.js
  # IMPORTANT TESTING NOTES
  =========================
  - Take care to properly test async methods with awaits, otherwise you may be
    doing edge-case things like checking the truthyness on a Promise object
  - [ ] @TODO We're not testing canvas elements yet. It's seems possible via e2e
  testing though, so we'll absolutely want to test that considering inference
  depends on that!
*/
const STUBS = require('../mock/jest-polyfills')
const SeeClarke = require('./SeeClarke')
let seeclarke = null

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  STUBS.mediaDevices.unsupport()
  try {seeclarke = new SeeClarke()} catch (e) {}
  expect(seeclarke).toBeFalsy()

  // Set mediaDevices and try again
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  seeclarke = new SeeClarke()
  expect(seeclarke).toBeTruthy()
})

it('Sanitizes options and sets sane defaults', () => {
  seeclarke = new SeeClarke()
  expect(seeclarke.options.posenet).toBeTruthy()
})

it('Autostarts if options.autostart', () => {
  seeclarke = new SeeClarke({autostart: false})
  expect(seeclarke._isTracking).toEqual(false)

  seeclarke = new SeeClarke({autostart: true})
  expect(seeclarke._isTracking).toEqual(true)
})

/**
 * SeeClarke.trackPoses
 */
it('If debug is on, displays the points and skeletons overlays on the webcam', () => {
  seeclarke = new SeeClarke({autostart: false, debug: false})
  // Mock debugPoses; we're testing individual draw methods in other tests
  seeclarke.debugPoses = jest.fn()
  seeclarke.trackPoses([])
  expect(seeclarke.debugPoses).not.toHaveBeenCalled()

  seeclarke.debug = true
  seeclarke.trackPoses([])
  expect(seeclarke.debugPoses).toHaveBeenCalled()
})

it('Automatically adjusts algorithm to match "single" or "multiple mode"', () => {
  seeclarke = new SeeClarke({autostart: false, debug: true, posenet: {maxUsers: 1}})
  seeclarke.debugPoses = jest.fn()
  seeclarke.posenet = STUBS.posenet
  seeclarke.trackPoses()
  expect(seeclarke.posenet.estimateSinglePose).toHaveBeenCalled()

  seeclark.update({posenet: {maxUsers: 2}})
  seeclarke.trackPoses()
  expect(seeclarke.posenet.estimateMultiplePoses).toHaveBeenCalled()
})
