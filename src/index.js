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
    this.setDefaults(opts)
    this.mapDefaults()

    if (this.options.autostart) {
      this.setupFeed()
      this.initPoseNet()
    }
  }

  /**
   * Sets the default options, and overwrites this.originalOpts
   * @param {Object} opts Our initializer options, @see /wiki/Options.md
   */
  setDefaults (opts) {
    this.initOptions = opts

    // Setup defaults
    this.options = {
      autostart: typeof opts.autostart !== 'undefined' ? opts.autostart : true,
      facingMode: opts.facingMode || 'user',
      feed: opts.feed || util.createDefaultVideoFeed(),
      posenet: {
        multiplier: opts.posenet && opts.posenet.multiplier ? opts.posenet.multiplier : 0.75
      }
    }
  }

  /**
   * Maps properties to the defaults (or in other words sets property aliases)
   */
  mapDefaults () {
    this.feed = this.options.feed
  }

  /**
   * Sets up the webcam and stream
   */
  async setupFeed () {
    // Error out when webcams are not supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !util.isWebGLSupported()) throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')

    // Set webcam dimensions
    this.feed.width = 600
    this.feed.height = 500

    // Start the stream based on the device
    const isMobile = util.isMobile()
    this.feed.srcObject = await navigator.mediaDevices.getUserMedia({
      // We only care about the camera
      audio: false,
      video: {facingMode: this.options.facingMode},
      width: isMobile ? undefined : this.feed.width,
      height: isMobile ? undefined : this.feed.height
    })
    this.feed.play()
  }

  /**
   * Initializes posenet
   */
  async initPoseNet () {
    this.posenet = await posenet.load(this.options.posenet.multiplier)
  }
}
