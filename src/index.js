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
   * Our main constructor
   * @param {OBJ} opts Our initializer options, @see /wiki/Options.md
   */
  constructor (opts = {}) {
    this.constructor.setDefaults.call(this, opts)
    this.constructor.mapDefaults.call(this)

    if (this.options.autostart) {
      this.constructor.setupFeed.call(this)
      this.constructor.initPoseNet.call(this)
    }
  }

  /**
   * Sets the default options, and overwrites this.originalOpts
   * @param {Object} opts Our initializer options, @see /wiki/Options.md
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
   * Maps properties to the defaults (or in other words sets property aliases)
   */
  static mapDefaults () {
    this.video = this.options.video
    this.canvas = this.options.canvas
  }

  /**
   * Sets up the webcam and stream
   */
  static async setupFeed () {
    // Error out when webcams are not supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !util.isWebGLSupported()) throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')

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
   * Initializes PoseNet and starts the tracker
   */
  static async initPoseNet () {
    this.posenet = await posenet.load(this.options.posenet.multiplier)
    this.trackPoses()
  }

  /**
   * !!! Tracks poses !!!
   *
   * This method is recursive, once called it continues until posepointer.stop() is called
   */
  async trackPoses () {
    let poses = []
    let minPoseConfidence = this.options.posenet.minPoseConfidence
    let minPartConfidence = this.options.posenet.minPartConfidence
  }
}
