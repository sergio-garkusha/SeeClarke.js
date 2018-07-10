/**
 * @TODO # util.js
 *
 * A collection of utility methods which may be helpful in your app outside
 * the context of SeeClarke:
 * [-] To import this utility, use `let SomeVariable = require('seeclarke/src/util.js')`
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = {
  /**
   * @TODO Creates a default (flipped) video and adds it to the DOM:
   * [-] The video is absolutely positioned within the $wrap
   *
   * @param {HTMLElement} $wrap A container to embed the video into
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  createDefaultVideo ($wrap) {
    const $video = document.createElement('video')

    $wrap.classList.add('seeclarke-debug-wrap')

    $video.setAttribute('playsinline', true)
    $video.style.transform = 'scale(-1, 1)'
    $video.style.position = 'absolute'
    $wrap.appendChild($video)

    return $video
  },

  /**
   * @TODO Creates a default (flipped) canvas and adds it to the DOM
   * [-] The canvas is added to the $wrap (along with the video) relatively
   *
   * @param {Element} $wrap The wrapping element to inject the canvas into
   *
   * @return {HTMLCanvasElement} A hidden canvas used for debugging with PoseNet
   */
  createDefaultCanvas ($wrap) {
    const $canvas = document.createElement('canvas')
    $canvas.style.transform = 'scale(-1, 1)'
    $canvas.style.position = 'relative'
    $canvas.style.top = 0
    $canvas.style.left = 0

    $wrap.appendChild($canvas)

    return $canvas
  },

  /**
   * @TODO Helpers for checking if we're on mobile
   * [-] Checks if we're on mobile
   * [-] Checks if we're on android
   * [-] Checks if we're on iOS
   */
  isMobile () { return this.isAndroid() || this.isiOS() },
  isAndroid () { return /Android/i.test(navigator.userAgent) },
  isiOS () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) },

  /**
   * @TODO Checks if WebGL is supported. Depending on your deployment needs,
   * you can first check if WebGL is supported with this method, and then either
   * display a message or start the tracker.
   *
   * [-] This will automatically fail if canvas is not supported!
   * [-] Checks for webgl and experimental-webgl
   *
   * @see https://stackoverflow.com/a/22953053
   *
   * @return {Boolean} Is WebGL supported?
   */
  isWebGLSupported () {
    try {
      let canvas = document.createElement('canvas')
      let isSupported = !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      canvas.remove()
      !isSupported && console.error('WebGL is not supported in this browser')
      return isSupported
    } catch (e) {
      console.error('WebGL is not supported in this browser')
      return false
    }
  },

  /**
   * @TODO Draw each tracked keypoint
   * [-] Draws keypoints only when they are "visible"
   * [] You can optionally set the keypoint styles
   *
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * @param {ARR} keypoints The list of all keypoints
   * @param {NUM} minConfidence The minimum keypoint score needed to track
   * @param {OBJ} context The canvas context to draw into
   */
  drawKeypoints (keypoints, minConfidence, context) {
    keypoints.forEach(({position, score}) => {
      if (score > minConfidence) {
        context.beginPath()
        context.arc(position.x, position.y, 15, 0, 2 * Math.PI)
        context.fillStyle = '#00ff00'
        context.fill()
      }
    })
  },

  /**
   * @TODO Draw each tracked skeleton
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * [-] Draws all visible segments captured with PoseNet.getAdjacentKeyPoints
   *
   * @param {ARR} adjacentPoints The list of all keypoints and their relationships
   * @param {OBJ} context The canvas context to draw into
   */
  drawSkeleton (adjacentPoints, context) {
    adjacentPoints.forEach(keypoints => {
      this.drawSegment(this.toTuple(keypoints[0].position), this.toTuple(keypoints[1].position), context)
    })
  },

  /**
   * @TODO Converts a position to a tuple
   * [-] Essentially converts an {x, y} object into a [y, x] array
   *
   * @param {OBJ} position {x, y}
   */
  toTuple ({x, y}) { return [y, x] },

  /**
   * @TODO Draws the skeleton segment
   * [-] A segment is a straight line between two tuples
   * [] You can optionally set the styles
   *
   * @param {OBJ} fromTuple [ay, ax] The starting point
   * @param {OBJ} toTuple [by, bx] The ending point
   * @param {HEX} color The color to draw in
   * @param {OBJ} context The canvas context to draw in
   */
  drawSegment ([ay, ax], [by, bx], context) {
    const scale = 1

    context.beginPath()
    context.moveTo(ax * scale, ay * scale)
    context.lineTo(bx * scale, by * scale)
    context.lineWidth = 10
    context.strokeStyle = '#ff00ff'
    context.stroke()
  }
}
