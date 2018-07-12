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
  seeclarke = new SeeClarke()
  expect(seeclarke._isTracking).toEqual(false)

  seeclarke = new SeeClarke({autostart: true})
  expect(seeclarke._isTracking).toEqual(true)
})

/**
 * SeeClarke.trackPoses
 */
it('If debug is on, displays the points and skeletons overlays on the webcam', () => {
  seeclarke = new SeeClarke({debug: false})
  // Mock debugPoses; we're testing individual draw methods in other tests
  seeclarke.debugPoses = jest.fn()
  seeclarke.trackPoses([])
  expect(seeclarke.debugPoses).not.toHaveBeenCalled()

  seeclarke.debug = true
  seeclarke.trackPoses([])
  expect(seeclarke.debugPoses).toHaveBeenCalled()
})

it('Automatically adjusts algorithm to match "single" or "multiple mode"', () => {
  seeclarke = new SeeClarke({debug: true, posenet: {maxUsers: 1}})
  seeclarke.debugPoses = jest.fn()
  seeclarke.posenet = {
    estimateSinglePose: STUBS.posenet.estimateSinglePose,
    estimateMultiplePoses: STUBS.posenet.estimateMultiplePoses
  }
  seeclarke.trackPoses()
  expect(seeclarke.posenet.estimateSinglePose).toHaveBeenCalled()

  seeclarke.update({posenet: {maxUsers: 2}})
  seeclarke.trackPoses()
  expect(seeclarke.posenet.estimateMultiplePoses).toHaveBeenCalled()
})

/**
 * SeeClarke.debugPoses
 */
it('Draws skeletons and keypoints', () => {
  seeclarke = new SeeClarke({debug: true})

  seeclarke.drawSkeleton = jest.fn()
  seeclarke.drawKeypoints = jest.fn()

  seeclarke.trackPoses(STUBS.data.posenet.pose.single)
  expect(seeclarke.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(seeclarke.drawKeypoints).toHaveBeenCalledTimes(1)

  seeclarke.options.posenet.minPoseConfidence = 1
  seeclarke.trackPoses(STUBS.data.posenet.pose.single)
  expect(seeclarke.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(seeclarke.drawKeypoints).toHaveBeenCalledTimes(1)
})

/**
 * SeeClarke.start
 */
it('Starts tracking poses', () => {
  seeclarke = new SeeClarke({debug: true})

  seeclarke.constructor.setupFeed = jest.fn()
  seeclarke.constructor.initPoseNet = jest.fn()
  seeclarke.constructor.trackPosesLoop = jest.fn()

  seeclarke.start()
  seeclarke.start()
  seeclarke.start()
  expect(seeclarke.constructor.trackPosesLoop).toHaveBeenCalledTimes(1)
})

/**
 * SeeClarke.stop
 */
it('Stops tracking poses', () => {
  seeclarke = new SeeClarke()

  seeclarke.constructor.setupFeed = jest.fn()
  seeclarke.constructor.initPoseNet = jest.fn()
  seeclarke.constructor.trackPosesLoop = jest.fn()

  seeclarke.stop()
  expect(seeclarke._isTracking).toBeFalsy()
  seeclarke._isTracking = true
  seeclarke.stop()
  expect(seeclarke._isTracking).toBeFalsy()
})

/**
 * SeeClarke.update
 */
it('Can update settings', () => {
  seeclarke = new SeeClarke()

  seeclarke.options = null
  seeclarke.update()
  expect(seeclarke.options).toBeTruthy()

  seeclarke.update({debug: true})
  expect(seeclarke.debug).toBeTruthy()
})

/**
 * SeeClarke.runCalculations
 */
it('Can run calculations and emmit events', () => {
  seeclarke = new SeeClarke()
  seeclarke.runHackyCalculations = jest.fn()
  seeclarke.emitEvents = jest.fn()

  seeclarke.runCalculations()
  expect(seeclarke.runHackyCalculations).toHaveBeenCalled()
  expect(seeclarke.emitEvents).toHaveBeenCalled()
})
