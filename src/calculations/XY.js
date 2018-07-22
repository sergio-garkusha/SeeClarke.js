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
   * Entry point for our hacky calculations
   * - Calculates "pointedAt" for each pose
   */
  SeeClarke.prototype.calculateXY = function () {
    this.poses && this.poses.forEach((pose, index) => {
      const nose = pose.keypoints[0]
      const envWidth = window.outerWidth
      const envHeight = window.outerHeight
      let poseAverages = 0

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
      let yaw = this.calculateHeadYaw(pose)
      let pitch = this.calculateHeadPitch(pose)
      x += yaw * window.outerWidth / 2
      y += pitch * window.outerHeight / 2

      // Let's add it to the stack
      this.poseStack[index] = this.poseStack[index] || []
      this.poseStack[index].push({x, y})
      if (this.poseStack[index].length > this.options.poseStackSize) this.poseStack[index].shift()

      // Finally let's get the average
      poseAverages = this.averagePoseStack(this.poseStack[index])
      x = poseAverages.x
      y = poseAverages.y

      // Assign values
      pose.pointedAt = {x, y}
      pose.angles = {pitch, yaw}
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
   * Problems with this aglorithm:
   * - All of it
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
    yaw = ((distanceRatio * 90 * sideLookingAt) * Math.PI / 180)

    return yaw
  }

  /**
   * @FIXME Get the head's Pitch (looking up/down)
   * 👻 Let's unit test this AFTER we agree on a solid algorithm
   * 🧙 CAUTION HERO, FOR HERE BE 🐉 DRAGONS 🐉
   *
   * - 0* is you looking straight ahead
   * - 90* would be your head turned upwards
   * - -90* would be you head turned downwards
   *
   * My basic algorithm is:
   *  1. Calculate the average Y's for both ears (or whichever is visible)
   *  2. Calculate the distance the eyes are apart
   *  3. Calculate the distance between the nose and the averaged ear Y
   */
  SeeClarke.prototype.calculateHeadPitch = function (pose) {
    let yEarAverage = 0
    let numEarsFound = 0
    let eyeDistance = 0
    let distanceRatio = 0
    let points = pose.keypoints

    // 1. Calculate the average Y's for both ears (or whichever is visible)
    if (points[3].score >= this.options.posenet.minPartConfidence) {
      numEarsFound++
      yEarAverage += points[3].position.y
    }
    if (points[4].score >= this.options.posenet.minPartConfidence) {
      numEarsFound++
      yEarAverage += points[4].position.y
    }
    yEarAverage = yEarAverage / numEarsFound

    // 2. Calculate the distance the eyes are apart
    // - I am literally making this up as I go
    eyeDistance = points[1].position.x - points[2].position.x
    distanceRatio = (points[0].position.y - yEarAverage) / eyeDistance

    return (90 * distanceRatio) * Math.PI / 180
  }

  /**
   * @FIXME Averages the pose stacks to reduce "wobble"
   *
   * @param {Object} poseStack The posestack to average out
   *
   * @return {Object} The averaged {x, y}
   */
  SeeClarke.prototype.averagePoseStack = function (poseStack) {
    let x = 0
    let y = 0

    poseStack.forEach(pose => {
      x += pose.x
      y += pose.y
    })

    x = x / poseStack.length
    y = y / poseStack.length

    return {x, y}
  }
}
