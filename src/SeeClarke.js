/**
 * SeeClarke.js
 *
 * This file contains all the "onboarding methods"; a glance at these methods
 * should give you a general understanding for how the app works!
 *
 * @NOTE: My personal convention for bullet points is:
 * [] Describes what this method *will do* 🤔 (todo's)
 * [-] Describes what this method *should be doing* 🤷 (needs testing)
 * - Describes what this method *does* 🏆 (tested)
 */
require('./polyfills')
const merge = require('lodash/merge')
const PoseNet = require('@tensorflow-models/posenet')

class SeeClarke {
  /**
   * 🏆 Our main constructor
   * - Fails if getUserMedia is not supported
   * - Sanitizes options and sets sane defaults
   * - Autostarts if options.autostart
   * [] Creates the custom window event
   *
   * @param {Object} [opts={}] Constructor options, @see /wiki/Options.md
   */
  constructor (opts = {}) {
    /**
     * Whether we're tracking or not.
     *
     * @NOTE If manually set to false, this will break any active tracking loops
     * with unknown side effects. Use this.stop() instead!
     */
    this._isTracking = false

    /**
     * Collection of previously predicted points
     * - Each root-level index represents a pose
     * - Each pose is an array of the last X this.poses.[x].pointedAt's
     */
    this.poseStack = []

    /**
     * Whether the browser is supported or not
     * - This is mostly a helper property for testing
     */
    this._isSupported = false

    // Error out when webcams are not supported
    // @TODO Is there a better way handle this error?
    // @SEE https://github.com/LabOfOz/SeeClarke/issues/15
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !this.isWebGLSupported()) {
      throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')
    } else {
      // We know the browser has full support now
      this._isSupported = true

      // "Sanitize" constructor input
      this.update(opts)

      // Possibly autostart
      this.options.autostart && this.start()
    }
  }

  /**
   * Either assigns passed poses or estimates new poses
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  async trackPoses (poses = null) {
    if (!poses) {
      // Get single pose
      if (this.options.posenet.maxUsers === 1) {
        let pose = await this.posenet.estimateSinglePose(this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride)
        poses = [pose]
        // Get multiple poses
      } else {
        poses = await this.posenet.estimateMultiplePoses(
          this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride,
          this.options.posenet.maxUsers, this.options.posenet.scoreThreshold, this.options.posenet.nmsRadius)
      }
    }

    // Publicly set poses
    this.poses = poses

    // Only draw when debug is on
    this.debug && poses && this.debugPoses()
  }

  /**
   * Loops through each pose and draws their keypoints/skeletons
   * - Draws skeletons and keypoints
   */
  debugPoses () {
    const context = this.canvas.getContext('2d')

    this.poses.forEach(({score, keypoints}) => {
      if (score >= this.options.posenet.minPoseConfidence) {
        const adjacentKeypoints = PoseNet.getAdjacentKeyPoints(keypoints, this.options.posenet.minPartConfidence, context)

        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawSkeleton(adjacentKeypoints, context)
        this.drawKeypoints(keypoints, this.options.posenet.minPartConfidence, context)
      }
    })
  }

  /**
   * Start tracking poses:
   * - If this.options.autostart is false, then you can manually start it
   *    later with this
   * - A check is made internally so that only one process is ever running
   */
  start () {
    if (!this._isTracking) {
      if (this.debug) this.options.target.style.display = 'inherit'
      this._isTracking = true
      this.constructor.setupFeed.call(this)
      this.constructor.initPoseNet.call(this)
      this.constructor.trackPosesLoop(this)
    }
  }

  /**
   * Stop tracking poses:
   * - A process can be stopped to free up memory for other expensive processes
   *    or to save on power when idling with this
   */
  stop () {
    if (this._isTracking) {
      this.options.target.style.display = 'none'
      this._isTracking = false
      this.video.srcObject.getTracks().forEach(track => track.stop())
    }
  }

  /**
   * Updates this.options with new ones
   * - Can update settings
   *
   * @param  {Object} opts The options set to update
   */
  update (opts = {}) {
    if (this.options) this.options = merge(this.options, opts)

    this.constructor.setDefaults.call(this, opts)
    this.constructor.setAliases.call(this)
  }

  /**
   * @TODO Our calculation entry point. If you'd like to run your own calculations
   * (either to make improvements or test with non-euclidean geometries) you can
   * overwrite this method (@FIXME let's provide an API for this).
   *
   * All you have to do is set: this.poses[index].lookingAt = {x, y}
   *
   * [-] Runs hacky calculations (for now)
   * [-] Emmits events
   */
  runCalculations () {
    // @SEE ./calculations/XY.js
    this.calculateXY()
    // @SEE ./calculations/Z.js
    this.calculateZ()
    this.emitEvents()
  }
}

/**
 * That's it! You should have enough of an understanding to either fork the
 * project and make it yours or start picking off issues on GitHub:
 * https://github.com/LabOfOz/seeclarke.js/issues
 *
 * Here are some more methods:
 */
require('./calculations/XY')(SeeClarke)
require('./calculations/Z')(SeeClarke)
require('./Mixins')(SeeClarke)
require('./Helpers')(SeeClarke)

// Remember: to kick things off you'll want to instantiate this with `new`
module.exports = SeeClarke
