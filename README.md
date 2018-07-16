<div align="center">
  <p><img src="https://i.imgur.com/4nfh4tG.png" alt="SeeClarke.js" height=266>
  <br>
  <p><small>"Any sufficiently advanced technology is indistinguishable from magic."
  <br>- <a href="https://en.wikipedia.org/wiki/Arthur_C._Clarke">Arthur C. Clarke</a></small>
  <br>
  <p><a href="https://travis-ci.com/LabOfOz/SeeClarke"><img src="https://travis-ci.com/LabOfOz/SeeClarke.svg?branch=master" alt="build"></a><a href="https://codecov.io/gh/LabOfOz/SeeClarke">
  <img src="https://codecov.io/gh/LabOfOz/SeeClarke/branch/master/graph/badge.svg" />
</a>
<br>
<br>
<p><strong>Add client-side, head-tracked pointers</strong> to your <a href="#html5-projects">HTML5 projects</a> just...like...✨...that!
</div>

---

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge | last 5+ | last 5+ | last 3+ | last 2+ | last 2+

---

## Table of Contents:

- [About](#about)
  - [Demos](#demos)
- [Platforms](#platforms):
  - [HTML5 projects](#html5-projects) - Learn how to add SeeClarke.js to your HTML5 projects
    - [Installing via script tag](#installing-via-script-tag)
    - [Installing via NPM](#installing-via-npm)
- [Legend](#legend):
  - 🧙 **Clarke** tells you about [Methods](https://github.com/LabOfOz/SeeClarke/wiki/Methods) and [Events](https://github.com/LabOfOz/SeeClarke/wiki/Events)

  - 🧚🏽 **Curie** advises you on [Properties](https://github.com/LabOfOz/SeeClarke/wiki/Properties)

  - 🧞‍ **Al** catches you up on [Options](https://github.com/LabOfOz/SeeClarke/wiki/Options)

  - 👻 **Obi** points out features that are deprecated or not yet implemented

  - 🐉 **Gohan** represent warnings and other information to watch out for

---

## About

SeeClarke.js is a thin wrapper around [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) and [TensorFlow.js](https://js.tensorflow.org/) that calculates head-tracked cursor positions for a variable number of users at once, and is fast enough to work on mid-ranged mobile devices. Currently, SeeClarke only handles the calculations and it's up to you to decide what to do with it, for instance <small><small><small>(click links to play with demos)</small></small></small>:

You can see the visual evolution of this project in this [Twitter thread](https://twitter.com/LabOfOz/status/996603306540548096).

### Demos

| [Basic Cursor Positioning](https://codepen.io/labofoz/full/RBWvBp?editors=0010) | [Page Scrolling](https://codepen.io/labofoz/full/WKrrVj)
| :------------- | :-------------
| [![https://media.giphy.com/media/55vsITBRKRlaosFK7I/giphy.gif](https://media.giphy.com/media/55vsITBRKRlaosFK7I/giphy.gif)](https://codepen.io/labofoz/full/RBWvBp?editors=0010)| [![https://media.giphy.com/media/5b9d1dQlV7CzRJ5ueC/giphy.gif](https://media.giphy.com/media/5b9d1dQlV7CzRJ5ueC/giphy.gif)](https://codepen.io/labofoz/full/WKrrVj)|
| [**Focusing Elements**](https://codepen.io/labofoz/full/LBGZbx) | [**Panning Google Maps**](https://codepen.io/labofoz/full/ajdBzP) |
| [![https://media.giphy.com/media/3mJS1rtNDmSSh1dUKy/giphy.gif](https://media.giphy.com/media/3mJS1rtNDmSSh1dUKy/giphy.gif)](https://codepen.io/labofoz/full/LBGZbx) | [![Panning Google Maps](https://media.giphy.com/media/5UqLVqYo5BCy0zN7RQ/giphy.gif)](https://codepen.io/labofoz/full/ajdBzP) |
| [**Looking around Street Views**](https://codepen.io/labofoz/pen/GBovbJ) | [**Looking around YouTube 360**](https://codepen.io/labofoz/full/BPjJOo) |
| [![https://media.giphy.com/media/pjZpFaxj9jBFqS54vR/giphy.gif](https://media.giphy.com/media/pjZpFaxj9jBFqS54vR/giphy.gif)](https://codepen.io/labofoz/pen/GBovbJ) | [![https://giphy.com/gifs/83fHb6D3QQ7xb1WHBT](https://media.giphy.com/media/83fHb6D3QQ7xb1WHBT/giphy.gif)](https://codepen.io/labofoz/full/BPjJOo)

---

## Platforms

The following is a list of all the platforms and environments that we currently support:

### HTML5 Projects

> 🧙 **Clarke**: The first thing you'll want to do is get access to the `SeeClarke` class, so that you can instantiate it. Let's explore 2 options below!

**Installing Via Script Tag:** The easiest way to get started, allowing you to quickly test in sandboxes like [CodePen](https://codepen.io), [JSFiddle](https://jsfiddle.net/), or any site on the web:

```html
<!-- For the latest version -->
<script src="https://unpkg.com/seeclarke/dist/seeclarke.min.js"></script>

<!-- For a specific version (in this case, 0.0.3) -->
<script src="https://unpkg.com/seeclarke@0.0.3/dist/seeclarke.min.js"></script>
```

**Installing Via NPM:** You'll first want to add the package as a dependency to your project with:
```bash
# In your existing projects root
npm install --save seeclarke
```

You'll then be able to import it with:

```js
const SeeClarke = require('seeclarke')
```

> 🧙 **Clarke:** Now that we have SeeClarke, let's instantiate it with the `new` operator and have it autostart! Head over with Al to the options page and he'll explain the different types of configs for you!

```js
// Instantiate an instance of SeeClarke and autostart it
const seeclarke = new SeeClarke({autostart: true})
```

---

### Other Platforms Coming Soon

> 👻 **Casper:** Heads up! We're also planning support for the following: CLI's (via NodeJS), apps, IoT's, headerless environments, smart watches, game consoles, AR/VR/MR environments, vehicles, smart homes, smart factories, space stations, dreams, and realities!

---

## Browsers Support

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
| CustomEvent | IE, Safari Nightly Builds | `custom-event-polyfill` | &nbsp; |
