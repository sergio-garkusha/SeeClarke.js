/**
 * Mixins.test.js
 */
const PoseNet = jest.mock('@tensorflow-models/posenet')
const STUBS = require('../mock/jest-polyfills')
const SeeClarke = require('./SeeClarke')
let seeclarke = null

/**
 * SeeClarke.setDefaults
 */
it('Sets defaults to the missing constructor options', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  seeclarke = new SeeClarke()

  seeclarke.constructor.setDefaults.call(seeclarke)
  expect(seeclarke.canvas && seeclarke.video).toBeTruthy()

  const $wrap = document.createElement('div')
  $wrap.setAttribute('id', 'seeclarke-debug')
  document.body.appendChild($wrap)
  seeclarke.update({target: $wrap})

  seeclarke.constructor.setDefaults.call(seeclarke)
  expect(seeclarke.canvas && seeclarke.video).toBeTruthy()
})

/**
 * SeeClarke.setAliases
 */
it('Applies aliases to common options. Feel free to add your own in here', () => {
  seeclarke = new SeeClarke()
  seeclarke.options.video = 1
  seeclarke.options.canvas = 2
  seeclarke.options.debug = 3

  seeclarke.constructor.setAliases.call(seeclarke)
  expect(seeclarke.video).toBe(seeclarke.options.video)
  expect(seeclarke.canvas).toBe(seeclarke.options.canvas)
  expect(seeclarke.debug).toBe(seeclarke.options.debug)
})

/**
 * SeeClarke.setupFeed
 */
it('Sets up the webcam and stream', async () => {
  seeclarke = new SeeClarke()
  seeclarke.isMobile = jest.fn(() => true)

  seeclarke.video.play = jest.fn()
  seeclarke.video.srcObject = null
  await seeclarke.constructor.setupFeed.call(seeclarke)

  expect(seeclarke.video.play).toHaveBeenCalled()
  expect(seeclarke.video.srcObject).toBeTruthy()
})

/**
 * SeeClarke.initPoseNet
 */
it('Initializes PoseNet and starts the tracking loop', async () => {
  PoseNet.load = () => true
  seeclarke = new SeeClarke()

  seeclarke.posenet = false
  await seeclarke.constructor.initPoseNet.call(seeclarke)
  expect(seeclarke.posenet).toBeUndefined()

  seeclarke.posenet = true
  await seeclarke.constructor.initPoseNet.call(seeclarke)
  expect(typeof seeclarke.posenet === 'boolean').toBeTruthy()
})

/**
 * SeeClarke.trackPosesLoop
 */
it('This method is recursive, once called it continues until after !_isTracking', () => {
  seeclarke = new SeeClarke()
  seeclarke.trackPoses = jest.fn(() => { return true })
  seeclarke.runCalculations = jest.fn(() => { return true })
  seeclarke.emitEvents = jest.fn()

  seeclarke.posenet = {}
  seeclarke.poses = STUBS.data.posenet.pose.single
  seeclarke.constructor.trackPosesLoop.call(SeeClarke, seeclarke)

  expect(seeclarke.trackPoses).toHaveBeenCalled()
  expect(seeclarke.runCalculations).toHaveBeenCalled()
  expect(seeclarke.emitEvents).toHaveBeenCalled()
  seeclarke.stop()
})

/**
 * SeeClarke.emitEvents
 */
it('Emits onSeeClarkePoseUpdates with (this.poses, seeclarke)', () => {
  let callback = jest.fn()
  window.addEventListener('onSeeClarkePoseUpdates', callback)

  seeclarke = new SeeClarke()
  seeclarke.emitEvents()
  expect(callback).toHaveBeenCalled()
})
