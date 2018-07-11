/**
 * Mixins.test.js
 */
const STUBS = require('../mock/jest-polyfills')
const SeeClarke = require('./SeeClarke')
let seeclarke = null

/**
 * SeeClarke.setDefaults
 */
it('Sets defaults to the missing constructor options', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  seeclarke = new SeeClarke()

  seeclarke.constructor.setDefaults.call(seeclarke)
  expect(seeclarke.canvas && seeclarke.video).toBeTruthy()
})

/**
 * SeeClarke.setAliases
 */
it('Applies aliases to common options. Feel free to add your own in here', () => {
  seeclarke = new SeeClarke()
  seeclarke.options.video = 1
  seeclarke.options.canvas = 2
  seeclarke.options.debug = 3

  seeclarke.constructor.setAliases.call(seeclarke)
  expect(seeclarke.video).toBe(seeclarke.options.video)
  expect(seeclarke.canvas).toBe(seeclarke.options.canvas)
  expect(seeclarke.debug).toBe(seeclarke.options.debug)
})
