/**
 * Calculations.js
 *
 * Contains methods for calculating different things.
 *
 * @NOTE The following pose keypoint indexes mean the following: (@SEE https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints)
 * 0   nose
 * 1   leftEye
 * 2   rightEye
 * 3   leftEar
 * 4   rightEar
 * 5   leftShoulder
 * 6   rightShoulder
 * 7   leftElbow
 * 8   rightElbow
 * 9   leftWrist
 * 10	rightWrist
 * 11	leftHip
 * 12	rightHip
 * 13	leftKnee
 * 14	rightKnee
 * 15	leftAnkle
 * 16	rightAnkle
 *
 */
module.exports = function (SeeClarke) {
  /**
   * @TODO Entry point for our hacky calculations. This'll be overwritten eventually,
   * but we'll still want to unit test until then.
   *
   * @see
   */
  SeeClarke.prototype.runHackyCalculations = function () {
    this.poses.forEach((pose, index) => {
      const nose = pose.keypoints[0]

      // Helps map a point on the canvas to a point on the window
      const ratio = {
        width: window.outerWidth / this.canvas.width,
        height: window.outerHeight / this.canvas.height
      }

      // The canvas is mirrored, so left needs to be flipped
      let x = -nose.position.x * ratio.width + this.canvas.width
      let y = nose.position.y * ratio.height

      // Assign values
      pose.pointedAt = {x, y}
      this.poses[index] = pose
    })
  }
}
