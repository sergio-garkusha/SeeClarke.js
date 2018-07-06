/**
 * Util.js
 * Useful utility methods
 */
module.exports = {
  /**
   * Creates a default video and adds it to the DOM
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  createDefaultVideoFeed () {
    const $video = document.createElement('video')
    $video.setAttribute('playsinline', true)
    document.body.appendChild($video)

    return $video
  },

  /**
   * Helpers for checking if we're on mobile
   */
  isMobile () { return this.isAndroid() || this.isiOS() },
  isAndroid () { return /Android/i.test(navigator.userAgent) },
  isiOS () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) }
}
