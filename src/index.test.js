const jestPolyfill = require('./jest-polyfills')
const Posepointer = require('./index')
let posepointer = null

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  jestPolyfill.mediaDevices.unsupport()
  try {posepointer = new Posepointer()} catch (e) {}
  expect(posepointer).toBeFalsy()

  // Set mediaDevices and try again
  jestPolyfill.mediaDevices.support()
  jestPolyfill.WebGL.support()
  try {posepointer = new Posepointer()} catch (e) {}
  expect(posepointer).toBeTruthy()
})
