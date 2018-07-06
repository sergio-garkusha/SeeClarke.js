/**
 * Util.js
 * Useful utility methods
 */
module.exports = {
  /**
   * Creates a default (flipped) video and adds it to the DOM
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  createDefaultVideoFeed () {
    const $video = document.createElement('video')
    $video.setAttribute('playsinline', true)
    $video.style.transform = 'scale(-1, 1)'
    document.body.appendChild($video)

    return $video
  },

  /**
   * Helpers for checking if we're on mobile
   */
  isMobile () { return this.isAndroid() || this.isiOS() },
  isAndroid () { return /Android/i.test(navigator.userAgent) },
  isiOS () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) },

  /**
   * Checks if WebGL is supported
   * @see https://stackoverflow.com/a/22953053
   */
  isWebGLSupported () {
    try {
      let canvas = document.createElement('canvas')
      let isSupported = !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      canvas.remove()
      !isSupported && console.error('WebGL is not supported in this browser')
      return isSupported
    } catch (e) {
      console.error('WebGL is not supported in this browser')
      return false
    }
  }
}
