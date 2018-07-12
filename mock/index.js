/**
 * # /mock/index.js
 * Mock data for testing
 */
module.exports = {
  posenet: {
    adjacentPoints: require('../mock/adjacent-points.json'),
    pose: {
      single: require('../mock/posenet/single-pose.json'),
      multiple: require('../mock/posenet/multiple-poses.json')
    }
  }
}
