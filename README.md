<p align="center"><a href="https://posepointer.firebaseapp.com"><img src="https://media.giphy.com/media/1YfCgZlRFN9JqfrtRC/giphy.gif" alt="posepointer"></a></p>

<h1 align="center">🕶️ posepointer.js 🕶️</h1>
<p align="center"><a href="https://circleci.com/gh/LabOfOz/posepointer/master"><img src="https://img.shields.io/circleci/project/github/LabOfOz/posepointer/master.svg"></a></p>

<p align="center">Add client-side, face and arm tracked mouse cursors to your projects in one line of JavaScript!</p>

<p align="center"><a href="#browser-support">Browser Support</a> &middot; <a href="#building">Building</a> &middot; <a href="#troubleshooting">Troubleshooting</a> &middot; <a href="#links">Links</a> &middot; <a href="#privacy-policy">Privacy Policy</a> &middot; <a href="#license">License</a></p>

---

## About this Project

> **THIS PROJECT IS NOT READY.**

**posepointer.js** (once it's ready) will inject computer vision into your sites, apps, and IoT's in a single line of JavaScript! **posepointer** will do this through a [Tensorflow.js](https://js.tensorflow.org/) implementation of [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) by predicting where on the screen a user's head and arms are pointed towards.

> In fact, **posepointer** will be able to track multiple people on a modern web browser running on a mid-ranged mobile device. This means that you will be able to very easily add hands-free, install-less, gesture-controlled interfaces to your projects that work on most mobile devices out there **_FAST_**!

Because of the many possible and varied applications, **posepointer** is being developed with a plugin system in mind. **Posepointer with no configuration/plugins only handles calculating these points.** This decision was made to encourage a rich plugin ecosystem 👨‍👩‍👧‍👦

> **THIS PROJECT IS NOT READY.**


### Ideas

```
// @TODO Create a link to our past examples and make square gifs
```

| | | |
|----------|-------------------|-----|
| Draw with your face | Virtual keyboard | Moarse Code |
| "Look around" Street Views | VR Scenes | Scrolling web pages |

---

## Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge | last 5+ | last 5+ | last 3+ | last 2+ | last 2+

### Browser Busters
The following is a list of features that are currently breaking browser support:

| Browser | Breaking Features |
|---------|-------------------|
| IE11 | getUserMedia
| Opera Mini | getUsermedia, WebGL

### Polyfills
The following polyfills are providing support for older browsers:

| Polyfill | Affected Browsers | Fix | Notes |
|----------|-------------------|-----|-------|
| getUserMedia | Chrome <= 49 <br> iOS <= 10.3  | /src/polyfills.js | We're basically only supporting the API change from `navigator.getUserMedia` to `navigator.mediaDevices.getUserMedia`
---

## Building

The only hard dependency required for building the project is [NodeJS >= 8.11.2](https://nodejs.org/en/download/). If you want to author tests you'll also need [Java >= 1.6](https://java.com/), though **please note that you neither need Java nor do you need to create tests** ([see our Tests section below](#testing))!

The following scripts are available from the project root. Note that you can replace `npm run ...` with just `yarn ...` if you have [Yarn installed](https://yarnpkg.com/en/).

``` bash
# Install dependencies
npm install

# Start the dev server
npm dev

# Build to /dist
npm build
```

### Testing

> **Please note that when contributing to this project, you don't need to add tests** (we'll take care of that)

Unit tests all live next to their source files, suffixed with `*.spec.js`. In fact, any file suffixed with `*.spec.js` will automatically get used when running one of the test commands (`npm run unit`, `npm run e2e`, or `npm run test`).

The following key tests are made:
```
// @TODO list our most important e2e and unit tests here
```

---

## Links

* Our main site: // @TODO
* Personal Twitter <a href="https://twitter.com/labofoz">@LabOfOz</a>
* Email: labofoz@gmail.com

---

## Privacy Policy

I don't know enough about WebRTC security yet to confidently guarantee how secure this library is out of the box (please contact me if you'd like to assist with this). Until then, please keep in mind the following:

* A user must approve a browser pop-up asking for the webcam to be turned on. This typically only needs to be done once, though there are cases where it must be approved every time (like when deployed in a sandboxed or incognito environment). Please keep this in mind when deploying to headerless browser environments
* It's probably good etiquitte to indicate to the user within your app that the webcam is still on
* Malicious scripts may be able to see the webcam feed with the current out of the box setup
