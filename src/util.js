const PoseNet = require('@tensorflow-models/posenet')

/**
 * Util.js
 * Useful utility methods
 */
module.exports = {
  /**
   * Creates a default (flipped) video and adds it to the DOM
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  createDefaultVideo () {
    const $wrap = document.createElement('div')
    const $video = document.createElement('video')

    $wrap.classList.add('posepointer-debug-wrap')
    $video.setAttribute('playsinline', true)

    $wrap.style.position = 'relative'
    $video.style.transform = 'scale(-1, 1)'
    $video.style.position = 'absolute'

    document.body.appendChild($wrap)
    $wrap.appendChild($video)

    return $video
  },

  /**
   * Creates a default (flipped) canvas and adds it to the DOM
   *
   * @param {Element} video The $video element to get a parent wrapper for
   * @return {HTMLCanvasElement} A hidden canvas used for debugging with PoseNet
   */
  createDefaultCanvas (video) {
    const $canvas = document.createElement('canvas')
    $canvas.style.transform = 'scale(-1, 1)'
    $canvas.style.position = 'absolute'
    $canvas.style.top = 0
    $canvas.style.left = 0
    video.parentElement.appendChild($canvas)

    return $canvas
  },

  /**
   * Helpers for checking if we're on mobile
   */
  isMobile () { return this.isAndroid() || this.isiOS() },
  isAndroid () { return /Android/i.test(navigator.userAgent) },
  isiOS () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) },

  /**
   * Checks if WebGL is supported
   * @see https://stackoverflow.com/a/22953053
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
   * Draw each tracked keypoint
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
   * Draw each tracked skeleton
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * @param {ARR} keypoints The list of all keypoints
   * @param {NUM} minConfidnece The minimum keypoint score needed to track
   * @param {OBJ} context The canvas context to draw into
   */
  drawSkeleton (keypoints, minConfidence, context) {
    const adjacentPoints = PoseNet.getAdjacentKeyPoints(keypoints, minConfidence, context)

    adjacentPoints.forEach(keypoints => {
      this.drawSegment(this.toTuple(keypoints[0].position), this.toTuple(keypoints[1].position), context)
    })
  },

  /**
   * Converts a position to a tuple
   * @param {OBJ} position {y, x}
   */
  toTuple ({y, x}) { return [y, x] },

  /**
   * Draws a skeleton segment
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
    context.strokeStyle = '#0000ff'
    context.stroke()
  }
}
