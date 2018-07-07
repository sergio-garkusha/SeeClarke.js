/**
 * index.js
 * - Main entrypoint for Posepointer
 *
 * - Usage example 1:
 *    new (require('posepointer'))(OPTIONS)
 *
 * - Usage example 2:
 *    <script src="./posepointer.js"></script>
 *
 * - Usage example 3:
 *    import Posepointer from 'posepointer'
 *    const posepointer = new Posepointer(OPTIONS)
 *
 *    posepointer.update(NEW_OPTIONS)
 */
require('./polyfills')
const util = require('./util')

class Posepointer {
  /**
   * # CONSTRUCTOR
   * ## IMPORTANT METHOD: @TODO
   *
   * [] Sanitizes options and sets sane defaults (@IDEA maybe we can create
   *    "quickstart strings", where you can pass a string for a set of common
   *    options instead, like ['desktop', 'ios11', 'Raspberry Pi'])
   * [] If autostart is true, then tracking is initialized if Posepointer
   *    itself hasn't initialized PoseNet yet, otherwise tracking resumes
   *
   * @param {Object} [opts={}] Constructor options, @see /wiki/Options.md
   */
  constructor (opts = {}) {
    /**
     * Whether we're tracking or not: @TODO
     * [] If manually set to false, this will break any active tracking loops
     *    with unknown side effects. Use this.stop() instead!
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
   * # PUBLIC METHOD
   *
   * Tracks poses on the current video feed frame: @TODO
   * [] Automatically adjusts algorithm to match "single" or "multiple mode"
   * [] If debug is on, displays the points and skeletons overlays on the webcam
   */
  async trackPoses () {
    const context = this.canvas.getContext('2d')
    let poses = []

    // Get single pose
    if (this.options.posenet.maxUsers === 1) {
      // @TODO comment this
      let pose = await this.posenet.estimateSinglePose(this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride)
      poses.push(pose)
    // Get multiple poses
    } else {
      poses = await this.posenet.estimateMultiplePoses(
        this.video, this.options.posenet.imageScaleFactor, false, this.options.posenet.outputStride,
        this.options.posenet.maxUsers, this.settings.posenet.scoreThreshold, this.options.posenet.nmsRadius)
    }

    this.poses = poses

    // Only draw when debug is on
    if (this.debug) {
      poses.forEach(({score, keypoints}) => {
        if (score >= this.options.posenet.minPoseConfidence) {
          context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          util.drawSkeleton(keypoints, this.options.posenet.minPartConfidence, context)
          util.drawKeypoints(keypoints, this.options.posenet.minPartConfidence, context)
        }
      })
    }
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
    if (!this._isTracking) {
      if (this.debug) this.options.target.style.display = 'inherit'
      this.constructor.setupFeed.call(this)
      this.constructor.initPoseNet.call(this)
    }
  }

  /**
   * # PUBLIC METHOD
   *
   * Stop tracking poses: @TODO
   * [] A process can be stopped to free up memory for other expensive processes
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

require('./mixins')(Posepointer)
module.exports = Posepointer
