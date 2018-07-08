/**
 * # index.js
 *
 * This file contains all the "onboarding methods"; a glance at these methods
 * should give you a general understanding for how the app works!
 *
 * @NOTE: My personal convention for bullet points in docblockr comments is:
 * [] Describes what this method *will do* (to do's)
 * [-] Describes what this method *should be doing* (needs unit/e2e testing)
 * - Describes what this method does (passes unit/e2e)
 */
require('./polyfills')
const PoseNet = require('@tensorflow-models/posenet')
const util = require('./util')

class Posepointer {
  /**
   * Our main constructor
   * - Fails if getUserMedia is not supported
   * - Sanitizes options and sets sane defaults
   * - Autostarts if options.autostart
   *
   * @param {Object} [opts={}] Constructor options, @see /wiki/Options.md
   */
  constructor (opts = {}) {
    /**
     * Whether we're tracking or not.
     *
     * @NOTE If manually set to false, this will break any active tracking loops
     * with unknown side effects. Use this.stop() instead!
     *
     * @type {Boolean}
     */
    this._isTracking = false

    /**
     * Whether the browser is supported or not
     * - This is mostly a helper property for testing
     */
    this._isSupported = false

    // Error out when webcams are not supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !util.isWebGLSupported()) {
      throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')
    } else {
      // The browser has full support
      this._isSupported = true

      // "Sanitize" constructor input
      this.constructor.setDefaults.call(this, opts)
      this.constructor.setAliases.call(this)

      // Possibly autostart
      this.options.autostart && this.start()
    }
  }

  /**
   * @TODO Tracks poses on the current video feed frame:
   * [-] Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   */
  async trackPoses () {
    let poses = []

    // @NOTE This conditional is *ONLY* here for unit testing purposes
    // @SEE ./index.test.js (Posepointer.trackposes)
    if (this.posenet) {
      // Get single pose
      if (this.options.posenet.maxUsers === 1) {
        let pose = await this.posenet.estimateSinglePose(this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride)
        poses = [pose]
        // Get multiple poses
      } else {
        poses = await this.posenet.estimateMultiplePoses(
          this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride,
          this.options.posenet.maxUsers, this.settings.posenet.scoreThreshold, this.options.posenet.nmsRadius)
        }
    }

    // Publicly set poses
    this.poses = poses

    // Only draw when debug is on
    this.debug && this.debugPoses()
  }

  /**
   * @TODO Loops through each pose and draws their keypoints/skeletons
   * [-] Draws skeletons/keypoints
   */
  debugPoses () {
    const context = this.canvas.getContext('2d')

    this.poses.forEach(({score, keypoints}) => {
      if (score >= this.options.posenet.minPoseConfidence) {
        const adjacentKeypoints = PoseNet.getAdjacentKeyPoints(keypoints, this.options.posenet.minPartConfidence, context)

        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        util.drawSkeleton(adjacentKeypoints, context)
        util.drawKeypoints(keypoints, this.options.posenet.minPartConfidence, context)
      }
    })
  }

  /**
   * @TODO # PUBLIC METHOD
   *
   * Start tracking poses:
   * [-] If this.options.autostart is false, then you can manually start it
   *    later with this
   * [-] If the process has started this will restart that process
   * [-] A check is made internally so that only one process is ever running
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
   * @TODO # PUBLIC METHOD
   *
   * Stop tracking poses:
   * [-] A process can be stopped to free up memory for other expensive processes
   *    or to save on power when idling with this
   */
  stop () {
    if (this._isTracking) {
      this.options.target.style.display = 'none'
      this._isTracking = false
      this.video.srcObject.getTracks().forEach(track => track.stop())
    }
  }
}

/**
 * That's it! You should have enough of an understanding to start picking off
 * issues on GitHub: https://github.com/LabOfOz/posepointer.js/issues
 *
 * Here are some more methods:
 */
require('./mixins')(Posepointer)

// Remember: to kick things off you'll want to instantiate this with `new`
module.exports = Posepointer
