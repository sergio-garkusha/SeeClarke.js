/**
 * # polyfills.js
 *
 * This file adds polyfill support, and we take care to provide the best
 * polyfills we can.
 *
 * @NOTE This file is also imported into the test runners!
 *
 * Please list any browser busting issues below: @BROWSERBUSTERS
 * [] IE 9, 10, 11 - Does not work due to dependency on getUserMedia (@see https://caniuse.com/#feat=stream ) which can be shimmed (@see https://github.com/addyosmani/getUserMedia.js/ )
 * [] iOS 10.3 Safari - Does not work due to dependency on getUserMedia (@see https://caniuse.com/#feat=stream )
 * [] Opera Mini - Does not work due to dependency on getUserMedia (@see https://caniuse.com/#feat=stream )
 * [] MS Edge - Does not work as it crashes with "Extension WEBGL_lose_context not supported on this browser." This might be shimmable with a Uint8ClampedArray polyfill.
 */
require('custom-event-polyfill')

 /**
  * @TODO @POLYFILL Unifies vendor prefixes for getUserMedia:
  * [] Adds backwards compatability for Webkit and Mozilla
  */
 navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
