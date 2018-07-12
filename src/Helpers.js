/**
 * Helpers.js
 *
 * A collection of helpers methods which may be helpful in your app outside
 * the context of SeeClarke
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = function (SeeClarke) {
  /**
   * Creates a default (flipped) video and adds it to the DOM:
   * - The video is absolutely positioned within the $wrap
   *
   * @param {HTMLElement} $wrap A container to embed the video into
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  SeeClarke.prototype.createDefaultVideo = function ($wrap) {
    const $video = document.createElement('video')

    $wrap.classList.add('seeclarke-debug-wrap')

    $video.setAttribute('playsinline', true)
    $video.style.transform = 'scale(-1, 1)'
    $video.style.position = 'absolute'
    $wrap.appendChild($video)

    return $video
  }

  /**
   * Creates a default (flipped) canvas and adds it to the DOM
   * - The canvas is added to the $wrap (along with the video) relatively
   *
   * @param {Element} $wrap The wrapping element to inject the canvas into
   *
   * @return {HTMLCanvasElement} A hidden canvas used for debugging with PoseNet
   */
  SeeClarke.prototype.createDefaultCanvas = function ($wrap) {
    const $canvas = document.createElement('canvas')
    $canvas.style.transform = 'scale(-1, 1)'
    $canvas.style.position = 'relative'
    $canvas.style.top = 0
    $canvas.style.left = 0

    $wrap.appendChild($canvas)

    return $canvas
  }

  /**
   * Helpers for checking if we're on mobile
   * - Checks if we're on mobile
   * - Checks if we're on android
   * - Checks if we're on iOS
   */
  SeeClarke.prototype.isMobile = function () { return this.isAndroid() || this.isiOS() }
  SeeClarke.prototype.isAndroid = function () { return /Android/i.test(navigator.userAgent) }
  SeeClarke.prototype.isiOS = function () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) }

  /**
   * Checks if WebGL is supported. Depending on your deployment needs,
   * you can first check if WebGL is supported with this method, and then either
   * display a message or start the tracker.
   *
   * - This will automatically fail if canvas is not supported!
   * - Checks for webgl and experimental-webgl
   *
   * @see https://stackoverflow.com/a/22953053
   *
   * @param {Boolean} forceThrow (Optional) Whether to force throw an error. This is mostly for unit testing to test failures
   * @return {Boolean} Is WebGL supported?
   */
  SeeClarke.prototype.isWebGLSupported = function (forceThrow = false) {
    try {
      if (forceThrow) throw(forceThrow)

      let canvas = document.createElement('canvas')
      let isSupported = true

      if (!canvas.getContext('webgl') || !canvas.getContext('experimental-webgl')) isSupported = false
      canvas.remove()

      return !!isSupported
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Draw each tracked keypoint
   * - Draws keypoints only when they are "visible"
   *
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * @param {ARR} keypoints The list of all keypoints
   * @param {NUM} minConfidence The minimum keypoint score needed to track
   * @param {OBJ} context The canvas context to draw into
   */
  SeeClarke.prototype.drawKeypoints = function (keypoints, minConfidence, context) {
    keypoints.forEach(({position, score}) => {
      if (score > minConfidence) {
        context.beginPath()
        context.arc(position.x, position.y, 15, 0, 2 * Math.PI)
        context.fillStyle = '#00ff00'
        context.fill()
      }
    })
  }

  /**
   * Draw each tracked skeleton
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * - Draws all visible segments captured with PoseNet.getAdjacentKeyPoints
   *
   * @param {ARR} adjacentPoints The list of all keypoints and their relationships
   * @param {OBJ} context The canvas context to draw into
   */
  SeeClarke.prototype.drawSkeleton = function (adjacentPoints, context) {
    adjacentPoints.forEach(keypoints => {
      this.drawSegment(this.toTuple(keypoints[0].position), this.toTuple(keypoints[1].position), context)
    })
  }

  /**
   * Converts a position to a tuple
   * - Essentially converts an {x, y} object into a [y, x] array
   *
   * @param {OBJ} position {x, y}
   */
  SeeClarke.prototype.toTuple = function ({x, y}) { return [y, x] }

  /**
   * Draws the skeleton segment
   * - A segment is a straight line between two tuples
   *
   * @param {OBJ} fromTuple [ay, ax] The starting point
   * @param {OBJ} toTuple [by, bx] The ending point
   * @param {HEX} color The color to draw in
   * @param {OBJ} context The canvas context to draw in
   */
  SeeClarke.prototype.drawSegment = function ([ay, ax], [by, bx], context) {
    const scale = 1

    context.beginPath()
    context.moveTo(ax * scale, ay * scale)
    context.lineTo(bx * scale, by * scale)
    context.lineWidth = 10
    context.strokeStyle = '#ff00ff'
    context.stroke()
  }
}
