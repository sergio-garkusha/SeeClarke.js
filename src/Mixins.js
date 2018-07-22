/**
 * Mixins.js
 *
 * A collection of additional, lower-priority methods.
 * @FIXME We should assign these to the prototype
 */
const PoseNet = require('@tensorflow-models/posenet')
const merge = require('lodash/merge')

module.exports = function (SeeClarke) {
  /**
   * Sets defaults to the missing constructor options:
   * - Sets defaults
   * - Creates a default debug container
   * - Creates a default video and canvas
   *
   * @param {Object} opts The options passed into the constructor. Pass null to use all defaults
   */
  SeeClarke.setDefaults = function (opts = {}) {
    // Fallback for default target
    if (!opts.target) {
      // @TODO Let's document this
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
    this.options = merge({
      autostart: false,
      canvas: this.createDefaultCanvas(opts.target),
      debug: false,
      facingMode: 'user',
      poseStackSize: 8,
      posenet: {
        multiplier: 0.75,
        maxUsers: 1,
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
        outputStride: 16,
        nmsRadius: 20,
        scoreThreshold: 0.5
      },
      target: opts.target,
      video
    }, opts)

    // Chache
    this.cache = {
      window: {
        // @SEE this.setupFeed
        area: 0
      }
    }
  }

  /**
   * Applies aliases to common options. Feel free to add your own in here
   * - Creates a shorthand to options
   */
  SeeClarke.setAliases = function () {
    this.video = this.options.video
    this.canvas = this.options.canvas
    this.debug = this.options.debug
  }

  /**
   * Sets up the webcam and stream:
   * - This creates its own video/canvas elements, allowing you to have
   *    multiple instances going (for example, to use front/back cameras
   *    simultaneously)
   * - Recreates the video feed to reassign srcObject once it's been stopped
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

    // Cache the area of the window
    this.cache.window.area = window.outerWidth * window.outerHeight

    this.video.play()
  }

  /**
   * @TODO Initializes PoseNet and starts the tracking loop:
   * [-] Loads a model from Google's servers based on the chosen PoseNet modifier
   */
  SeeClarke.initPoseNet = async function () {
    if (!this.posenet) this.posenet = await PoseNet.load(this.options.posenet.multiplier)
  }

  /**
   * Recursive method for tracking poses on each animationFrame:
   * - This method is recursive, once called it continues until after
   *    seeclarke.stop() is called or until this._isTracking is false
   *
   * @param {SeeClarke} context The this context, since we're in the
   *    constructor scope now
   */
  SeeClarke.trackPosesLoop = function (context) {
    context.posenet && context.trackPoses()
    if (context.poses) {
      context.runCalculations()
      context.emitEvents()
    }

    context._isTracking && requestAnimationFrame(() => this.trackPosesLoop(context))
  }

  /**
   * @TODO Emits events
   * [-] Emits onSeeClarkePoseUpdates with (this.poses, seeclarke)
   */
  SeeClarke.prototype.emitEvents = function () {
    window.dispatchEvent(new CustomEvent('onSeeClarkePoseUpdates', {
      detail: {
        context: this
      }
    }))
  }
}
