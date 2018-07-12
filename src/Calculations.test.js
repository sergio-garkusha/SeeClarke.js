/**
 * Mixins.test.js
 */
const STUBS = require('../mock/jest-polyfills')
const SeeClarke = require('./SeeClarke')
let seeclarke = null

/**
 * SeeClarke.setDefaults
 */
it('Entry point for our hacky calculations', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  seeclarke = new SeeClarke()
  seeclarke.poses = STUBS.data.posenet.pose.single
  seeclarke.constructor.setupFeed.call(seeclarke)
  seeclarke.runHackyCalculations()

  expect(seeclarke.poses[0].pointedAt).toBeTruthy()
})
