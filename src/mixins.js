/**
 * @TODO # mixins.js
 *
 * A collection of additional, lower-priority methods
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = function (SeeClarke) {
  /**
   * @TODO # PRIVATE METHOD
   *
   * Sets defaults to the missing constructor options:
   * [-] Creates a default debug container
   * [-] Creates a default video and canvas
   * [-] Sets defaults
   *
   * @param {Object} opts The options passed into the constructor
   */
  SeeClarke.setDefaults = function (opts) {
    // Fallback for default target
    if (!opts.target) {
      opts.target = document.getElementById('seeclarke-debug')

      if (!opts.target) {
        opts.target = document.createElement('p')
        opts.target.style.position = 'relative'
        document.body.appendChild(opts.target)
      }
    }
    opts.target.style.display = 'none'

    // Setup the video element
    const video = opts.video || this.createDefaultVideo(opts.target)
    this.initOptions = opts

    // Setup defaults
    // @FIXME This could use some refactoring, probably with Object.assign
    this.options = {
      autostart: typeof opts.autostart !== 'undefined' ? opts.autostart : false,
      canvas: opts.canvas || this.createDefaultCanvas(opts.target),
      debug: opts.debug || false,
      facingMode: opts.facingMode || 'user',
      posenet: {
        multiplier: opts.posenet && opts.posenet.multiplier ? opts.posenet.multiplier : 0.75,
        maxUsers: opts.posenet && opts.posenet.maxUsers ? opts.posenet.maxUsers : 1,
        minPoseConfidence: opts.posenet && opts.posenet.minPoseConfidence ? opts.posenet.minPoseConfidence : 0.1,
        minPartConfidence: opts.posenet && opts.posenet.minPartConfidence ? opts.posenet.minPartConfidence : 0.5,
        outputStride: opts.posenet && opts.posenet.outputStride ? opts.posenet.outputStride : 16,
        nmsRadius: opts.posenet && opts.posenet.nmsRadius ? opts.posenet.nmsRadius : 20,
        scoreThreshold: opts.posenet && opts.posenet.scoreThreshold ? opts.posenet.scoreThreshold : 0.5
      },
      target: opts.target,
      video
    }
  }

  /**
   * @TODO # PRIVATE METHOD
   *
   * Applies aliases to common options. Feel free to add your own in here
   * [] Creates a shorthand to options
   */
  SeeClarke.setAliases = function () {
    this.video = this.options.video
    this.canvas = this.options.canvas
    this.debug = this.options.debug
  }

  /**
   * @TODO # PRIVATE METHOD
   *
   * Sets up the webcam and stream:
   * [-] This creates its own video/canvas elements, allowing you to have
   *    multiple instances going (for example, to use front/back cameras
   *    simultaneously)
   * [-] Recreates the video feed to reassign srcObject once it's been stopped
   */
  SeeClarke.setupFeed = async function () {
    // Set webcam dimensions
    this.canvas.width = this.video.width = 600
    this.canvas.height = this.video.height = 500

    // Start the stream based on the device
    const isMobile = this.isMobile()
    this.video.srcObject = await navigator.mediaDevices.getUserMedia({
      // We only care about the camera
      audio: false,
      video: {facingMode: this.options.facingMode},
      width: isMobile ? undefined : this.video.width,
      height: isMobile ? undefined : this.video.height
    })
    this.video.play()
  }

  /**
   * @TODO # PRIVATE METHOD
   *
   * Initializes PoseNet and starts the tracking loop:
   * [] This loads a model from Google's servers based on the chosen PoseNet
   *    modifier
   * [] The webcam feed won't actually be visible until this method is resolved
   */
  SeeClarke.initPoseNet = async function () {
    if (!this.posenet) this.posenet = await PoseNet.load(this.options.posenet.multiplier)
  }

  /**
   * @TODO # PRIVATE METHOD
   *
   * Recursive method for tracking poses on each animationFrame:
   * [] This method is recursive, once called it continues until after
   *    seeclarke.stop() is called or until this._isTracking is false
   *
   * @param {SeeClarke} context The this context, since we're in the
   *    constructor scope now
   */
  SeeClarke.trackPosesLoop = function (context) {
    context.posenet && context.trackPoses()
    context._isTracking && requestAnimationFrame(() => this.trackPosesLoop(context))
  }
}
