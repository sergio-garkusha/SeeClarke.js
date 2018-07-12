/**
 * Helpers.test.js
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

  const $video = seeclarke.createDefaultVideo.call(seeclarke, document.createElement('div'))
  expect($video.style.position).toBe('absolute')
})

it('Creates a default (flipped) canvas and adds it to the DOM', () => {
  seeclarke = new SeeClarke()

  const $canvas = seeclarke.createDefaultCanvas.call(seeclarke, document.createElement('div'))
  expect($canvas.style.position).toBe('relative')
})

// Note that since we control the testing environment that we can safely assume
// the navigator.userAgent
it('Checks if we\'re on Mobile/Android/iOS', () => {
  seeclarke = new SeeClarke()
  expect(seeclarke.isAndroid()).toBe(false)
  expect(seeclarke.isiOS()).toBe(false)
  expect(seeclarke.isMobile()).toBe(false)
})

it('Checks if WebGL is supported', () => {
  seeclarke = new SeeClarke()
  const oldContext = HTMLCanvasElement.prototype.getContext

  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  expect(seeclarke.isWebGLSupported()).toBe(true)

  STUBS.mediaDevices.unsupport()
  STUBS.WebGL.unsupport()
  expect(seeclarke.isWebGLSupported('IGNORE THIS ERROR')).toBe(false)
})

/**
 * SeeClarke.toTuple
 */
it('Converts a position to a tuple', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  seeclarke = new SeeClarke()

  expect(seeclarke.toTuple({x: 1, y: 2})).toEqual([2, 1])
})

/**
 * SeeClarke.drawKeypoints
 */
it('Draw each tracked keypoint', () => {
  seeclarke = new SeeClarke()

  const $canvas = document.createElement('canvas')
  const context = $canvas.getContext('2d')
  context.fill = jest.fn()

  seeclarke.drawKeypoints(STUBS.data.posenet.pose.single[0].keypoints, 0.9, context)
  expect(context.fill).toHaveBeenCalled()
})

/**
 * SeeClarke.drawSkeleton
 */
it('Draw each tracked skeleton', () => {
  seeclarke = new SeeClarke()
  seeclarke.drawSegment = jest.fn()
  seeclarke.drawSkeleton(STUBS.data.posenet.adjacentPoints, document.createElement('canvas'))

  expect(seeclarke.drawSegment).toHaveBeenCalled()
})

/**
 * SeeClarke.drawSegment
 */
 it('Draws the skeleton segment', () => {
   seeclarke = new SeeClarke()

   const $canvas = document.createElement('canvas')
   const context = $canvas.getContext('2d')
   context.stroke = jest.fn()

   seeclarke.drawSegment([1, 2], [3, 4], context)
   expect(context.stroke).toHaveBeenCalled()
 })
