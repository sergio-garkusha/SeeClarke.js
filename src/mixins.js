const PoseNet = require('@tensorflow-models/posenet')
const util = require('./util')

module.exports = function (Posepointer) {
  /**
   * # PRIVATE METHOD
   *
   * Sets defaults to the missing constructor options
   * @FIXME This could use some refactoring
   *
   * @param {Object} opts The options passed into the constructor
   */
  Posepointer.setDefaults = function (opts) {
    // Fallback for default target
    if (!opts.target) {
      opts.target = document.getElementById('posepointer-debug')

      if (!opts.target) {
        opts.target = document.createElement('p')
        opts.target.style.position = 'relative'
        document.body.appendChild(opts.target)
      }
    }
    opts.target.style.display = 'none'

    // Setup the video element
    const video = opts.video || util.createDefaultVideo(opts.target)
    this.initOptions = opts

    // Setup defaults
    this.options = {
      autostart: typeof opts.autostart !== 'undefined' ? opts.autostart : true,
      canvas: opts.canvas || util.createDefaultCanvas(opts.target),
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
   * # PRIVATE METHOD
   *
   * Applies aliases to common options
   */
  Posepointer.setAliases = function () {
    this.video = this.options.video
    this.canvas = this.options.canvas
    this.debug = this.options.debug
  }

  /**
   * # PRIVATE METHOD
   *
   * Sets up the webcam and stream: @TODO
   * [] This will create its own video/canvas elements, allowing you to have
   *    multiple instances going (for example, to use front/back cameras
   *    simultaneously)
   * [] Recreates the video feed to reassign srcObject
   */
  Posepointer.setupFeed = async function () {
    // Set webcam dimensions
    this.canvas.width = this.video.width = 600
    this.canvas.height = this.video.height = 500

    // Start the stream based on the device
    const isMobile = util.isMobile()
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
   * # PRIVATE METHOD
   *
   * Initializes PoseNet and starts the tracking loop: @TODO
   * [] This loads a model from Google's servers based on the chosen PoseNet
   *    modifier
   * [] The webcam feed won't actually be visible until this method is resolved
   */
  Posepointer.initPoseNet = async function () {
    if (!this.posenet) this.posenet = await PoseNet.load(this.options.posenet.multiplier)
    this._isTracking = true
    this.constructor.trackPosesLoop(this)
  }

  /**
   * # PRIVATE METHOD
   *
   * Recursive method for tracking poses on each animationFrame: @TODO
   * [] This method is recursive, once called it continues until after
   *    posepointer.stop() is called or until this._isTracking is false
   *
   * @param {PosePointer} context The this context, since we're in the
   *    constructor scope now
   */
  Posepointer.trackPosesLoop = async function (context) {
    context.trackPoses()
    context._isTracking && requestAnimationFrame(() => this.trackPosesLoop(context))
  }
}
