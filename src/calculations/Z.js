/**
 * calculations/XY.js
 *
 * 🧙 CAUTION HERO, FOR 🐉 HERE BE DRAGONS 🐉
 * !!! The following code works by pure coincidence, please help improve it !!!
 *
 * Contains methods for calculating different the X/Y position on screen
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
   * Entry point for calculating the depth (distance away from camera)
   * @SEE https://github.com/labofoz/SeeClarke.js/issues/1
   *
   * - [ ] Calculates area of triangle between eyes and nose
   * - [ ] Use this value as the "depth"
   */
  SeeClarke.prototype.calculateZ = function () {
    this.poses && this.poses.forEach((pose, index) => {
      const nose = pose.keypoints[0]
      const eyeL = pose.keypoints[1]
      const eyeR = pose.keypoints[2]
      const x = [nose.position.x, eyeL.position.x, eyeR.position.x]
      const y = [nose.position.y, eyeL.position.y, eyeR.position.y]
      let distance

      // First calculate the area between
      let area = 0.5 * Math.abs(
        (x[0] * y[1]) + (x[1] * y[2]) + (x[2] * y[0])
      - (x[1] * y[0]) - (x[2] * y[1]) - (x[0] * y[2]))

      // Next divide it by the size of the window so that it's consistent across
      // devices and screen resolutions
      distance = this.cache.window.area / area

      // Assign values
      pose.pointedAt.z = distance
      this.poses[index] = pose
    })
  }
}
