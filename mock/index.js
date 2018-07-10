/**
 * # /mock/index.js
 * Mock data for testing
 */
module.exports = {
  posenet: {
    pose: {
      single: require('../mock/posenet/single-pose.json'),
      multiple: require('../mock/posenet/multiple-poses.json')
    }
  }
}
