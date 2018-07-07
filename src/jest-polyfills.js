/**
 * A suite of polyfill togglers for testing with jest
 */

/**
 * Suppress known warnings
 */
window.consoleWarn = console.warn
console.warn = function (message, ...args) {
  switch (message.slice(0, 30)) {
    case 'Registration of backend webgl ':
    case 'TypeError: gl.getExtension is ':
    break
    default:
      console.log(message)
  }
}

module.exports = {
  mediaDevices: {
    support () {
      window.HTMLMediaElement.prototype.load = () => {}
      window.HTMLMediaElement.prototype.play = () => {}
      window.HTMLMediaElement.prototype.pause = () => {}
      window.HTMLMediaElement.prototype.addTextTrack = () => {}
      navigator.mediaDevices = {
        getUserMedia: function () {}
      }
    },
    unsupport () {navigator.mediaDevices = null}
  },

  WebGL: {
    support () {window.WebGLRenderingContext = true},
    unupport () {window.WebGLRenderingContext = false}
  }
}
