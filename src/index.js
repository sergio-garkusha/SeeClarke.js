/**
 * index.js
 * - Main entrypoint for PosePointer
 *
 * - Usage example 1:
 *    new (require('posepointer'))(OPTIONS)
 *
 * - Usage example 2:
 *    <script src="./posepointer.js"></script>
 *
 * - Usage example 3:
 *    import PosePointer from 'posepointer'
 *    const posepointer = new PosePointer(OPTIONS)
 *
 *    posepointer.update(NEW_OPTIONS)
 */
const posenet = require('@tensorflow-models/posenet')
const util = require('./util')
require('./polyfills')

module.exports = class PosePointer {
  /**
   * # CONSTRUCTOR
   * ## IMPORTANT METHOD: @TODO
   *
   * [] Sanitizes options and sets sane defaults (@IDEA maybe we can create
   *    "quickstart strings", where you can pass a string for a set of common
   *    options instead, like ['desktop', 'ios11', 'Raspberry Pi'])
   * [] If autostart is true, then tracking is initialized if PosePointer
   *    itself hasn't initialized PoseNet yet, otherwise tracking resumes
   *
   * @param {Object} [opts={}] Constructor options, @see /wiki/Options.md
   */
  constructor (opts = {}) {
    /**
     * Whether we're tracking or not: @TODO
     * [] If manually set to false, this will break any active tracking loops
     *    with unknown side effects
     *
     * @type {Boolean}
     */
    this._isTracking = false

    // Error out when webcams are not supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !util.isWebGLSupported()) throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')

    // "Sanitize" constructor input
    this.constructor.setDefaults.call(this, opts)
    this.constructor.setAliases.call(this)

    // Possibly autostart
    this.options.autostart && this.start()
  }

  /**
   * # PRIVATE METHOD
   *
   * Sets defaults to the missing constructor options
   * @FIXME This could use some refactoring
   *
   * @param {Object} opts The options passed into the constructor
   */
  static setDefaults (opts) {
    this.initOptions = opts

    // Setup defaults
    this.options = {
      autostart: typeof opts.autostart !== 'undefined' ? opts.autostart : true,
      facingMode: opts.facingMode || 'user',
      video: opts.video || util.createDefaultVideo(),
      canvas: opts.canvas || util.createDefaultCanvas(),
      posenet: {
        multiplier: opts.posenet && opts.posenet.multiplier ? opts.posenet.multiplier : 0.75,
        maxUsers: opts.posenet && opts.posenet.maxUsers ? opts.posenet.maxUsers : 1,
        minPoseConfidence: opts.posenet && opts.posenet.minPoseConfidence ? opts.posenet.minPoseConfidence : 0.1,
        minPartConfidence: opts.posenet && opts.posenet.minPartConfidence ? opts.posenet.minPartConfidence : 0.5,
        nmsRadius: opts.posenet && opts.posenet.nmsRadius ? opts.posenet.nmsRadius : 20
      }
    }
  }

  /**
   * # PRIVATE METHOD
   *
   * Applies aliases to common options
   */
  static setAliases () {
    this.video = this.options.video
    this.canvas = this.options.canvas
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
  static async setupFeed () {
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
   */
  static async initPoseNet () {
    this.posenet = await posenet.load(this.options.posenet.multiplier)
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
  static async trackPosesLoop (context) {
    context.trackPoses()
    context._isTracking && requestAnimationFrame(() => this.trackPosesLoop(context))
  }

  /**
   * # PRIVATE METHOD
   * ## IMPORTANT METHOD
   *
   * Tracks poses on the current video feed frame: @TODO
   * [] Automatically adjusts algorithm to match "single" or "multiple mode"
   * [] If debug is on, displays the points and skeletons overlays on the webcam
   */
  async trackPoses () {
    let poses = []
    let minPoseConfidence = this.options.posenet.minPoseConfidence
    let minPartConfidence = this.options.posenet.minPartConfidence
  }

  /**
   * # PUBLIC METHOD
   *
   * Start tracking poses: @TODO
   * [] If this.options.autostart is false, then you can manually start it
   *    later with this
   * [] If the process has started this will restart that process
   * [] A check is made internally so that only one process is ever running
   */
  start () {
    this.constructor.setupFeed.call(this)
    this.constructor.initPoseNet.call(this)
  }

  /**
   * # PUBLIC METHOD
   *
   * Stop tracking poses: @TODO
   * [] A process can be stopped to free up memory for other expensive processes
   *    or to save on power when idling with this
   */
  stop () {
    console.log('this.stop()')
  }
}
