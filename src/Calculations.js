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
   * [] Calculates "pointedAt" for each pose
   */
  SeeClarke.prototype.runHackyCalculations = function () {
    this.poses && this.poses.forEach((pose, index) => {
      const nose = pose.keypoints[0]
      const envWidth = window.outerWidth
      const envHeight = window.outerHeight

      // Helps map a point on the.canvas to a point on the window
      const ratio = {
        width: envWidth / this.canvas.width,
        height: envHeight / this.canvas.height
      }

      // First, let's get where on the screen we are if looking dead ahead
      // The canvas is mirrored, so left needs to be flipped
      let x = -nose.position.x * ratio.width + envWidth
      let y = nose.position.y * ratio.height

      // @FIXME Now let's adjust for rotation
      x += this.calculateHeadYaw(pose) * window.outerWidth / 2

      // Assign values
      pose.pointedAt = {x, y}
      this.poses[index] = pose
    })
  }

  /**
   * @FIXME Get the head's Yaw (looking left/right)
   * 👻 Let's unit test this AFTER we agree on a solid algorithm
   * 🧙 CAUTION HERO, FOR HERE BE 🐉 DRAGONS 🐉
   *
   * - 0* is you looking straight ahead
   * - 90* would be your head turned to the right
   * - -90* would be you looking to the left
   *
   * My basic algorithm is:
   *  1. What is the x distance from the nose to each eye?
   *
   *  2. The difference between these distances determines the angle
   *    - For this algorithm, angles are between -90 and 90 (looking left and right)
   *
   * Issues with this aglorithm:
   * - One eye moves slightly closer to the screen than the other when yaw'ing
   */
  SeeClarke.prototype.calculateHeadYaw = function (pose) {
    const points = pose.keypoints
    let yaw = 0
    let distanceRatio
    let sideLookingAt
    let totalDistance

    // 1. What is the x distance from the nose to each eye?
    let eyeNoseDistance = {
      left: Math.abs(points[1].position.x - points[0].position.x),
      right: Math.abs(points[2].position.x - points[0].position.x)
    }
    totalDistance = eyeNoseDistance.left + eyeNoseDistance.right

    // 2. The difference between these distances determines the angle
    if (eyeNoseDistance.left > eyeNoseDistance.right) {
      distanceRatio = 1 - eyeNoseDistance.right / eyeNoseDistance.left
      sideLookingAt = 1
    } else {
      distanceRatio = 1 - eyeNoseDistance.left / eyeNoseDistance.right
      sideLookingAt = -1
    }

    // Try to tame this beast into a radian
    yaw = ((distanceRatio * 180 * sideLookingAt) * Math.PI / 180)

    return yaw
  }
}
