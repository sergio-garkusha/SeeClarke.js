/**
 * polyfills.js
 * Adds support for older browsers
 *
 * @todo IE 9, 10, 11 - Does not work due to dependency on getUserMedia (@see https://caniuse.com/#feat=stream ) which can be shimmed (@see https://github.com/addyosmani/getUserMedia.js/ )
 * @todo MS Edge - Does not work as it crashes with "Extension WEBGL_lose_context not supported on this browser." This might be shimmable with a Uint8ClampedArray polyfill.
 */

 /**
  * Unify vendor prefixes for getUserMedia
  */
 navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
