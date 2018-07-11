<div align="center">
<h1>✋ THIS ISN'T 100% READY YET ✋</h1>

<p>I'm super close though!
<br>For now, follow me on <a href="https://twitter.com/labofoz">Twitter @Labofoz</a> or Star the repo on <a href="https://github.com/labofoz/seeclarke">GitHub</a>.
<br> -- 🧙

<br>
<br>
<br>
<br>
</div>

```

                 .-"""-.
                #.   == \         Any sufficiently advanced
               ###  _   _#        technology is indistinguishable
               (_""(a)=(a)        from magic.
                \     _\ |
                 '.   = /         -- Arthur...
                __/`---;_
              /`   \___| `\

```

<br>
<div align="center">
  <p><img src="https://i.imgur.com/4nfh4tG.png" alt="SeeClarke.js" height=266>
  <br>
  <br>
  <p><a href="https://travis-ci.com/LabOfOz/SeeClarke"><img src="https://travis-ci.com/LabOfOz/SeeClarke.svg?branch=master" alt="build"></a><a href="https://codecov.io/gh/LabOfOz/SeeClarke">
  <img src="https://codecov.io/gh/LabOfOz/SeeClarke/branch/master/graph/badge.svg" />
</a>
<br>
<br>
</div>

**Add client-side, face-tracked pointers** to your on/offline: [HTML5 sites](#html5-sites), ~~apps, IoT's, headerless environments, smart watches, game consoles, AR/VR/MR environments, vehicles, smart homes, smart factories, space stations, dreams, and realities~~ **right now _in one line of code!_**

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge | last 5+ | last 5+ | last 3+ | last 2+ | last 2+

---

## Table of Contents:
- [HTML5 Sites](#html5-sites)
  - [As a Drop-In](#as-a-drop-in)
  - [Manual Start](#manual-start)
- [Wiki](wiki/)
  - [Methods](wiki/Methods)
  - [Options](wiki/Options)
  - [Properties](wiki/Properties)

---

## HTML5 SITES

#### One Line, Autostart Drop-in
```html
<!-- Autostarts and adds page scrolling and emits events -->
<!-- @TODO Add our library to unpkg. @SEE https://github.com/LabOfOz/seeclarke/issues/12 -->
<script src="//unpkg.com/seeclarke/dist/seeclarke.min.js?autostart"></script>
```

#### Manual Start
```html
<!-- @TODO Add our library to unpkg. @SEE https://github.com/LabOfOz/seeclarke/issues/12 -->
<script src="//unpkg.com/seeclarke/dist/seeclarke.min.js"></script>
<script>
  // In multilines
  var config = {}
  var seeclarke = new SeeClarke(config)
  seeclarke.start()

  // or in one
  (new SeeClarke()).start()
</script>
```

```
🗺️ ROADMAP: UP NEXT, TERMINAL/CLI DROP-IN










                .--'.   \/  .'--..
                      '( \.'
                       M M














                                         _..__.          .__.._
                                       .^"-.._ '-|\__/|-' _..-"^.
                                              '-.'    '.-'
                                                 `M--M'










                          ACT FAST, HERO, FOR A











                  (      (                         )      )
                  )\ )   )\ )    (      (       ( /(   ( /(
                 (()/(  (()/(    )\     )\ )    )\())  )\())
                  /(_))  /(_))((((_)(  (()/(   ((_)\  ((_)\
                 (_))_  (_))   )\ _ )\  /(_))_   ((_)  _((_)
                  |   \ | _ \  (_)_\(_)(_)) __| / _ \ | \| |
                  | |) ||   /   / _ \    | (_ || (_) || .` |
                  |___/ |_|_\  /_/ \_\    \___| \___/ |_|\_|









                                APPROACHES!








                           ==(W{==========-      /===-
                             ||  (.--.)         /===-_---~~~~~~~~~------____
                             | \_,|**|,__      |===-~___                _,-'
                -==\\        `\ ' `--'   ),    `//~\\   ~~~~`---.___.-~~
            ______-==|        /`\_. .__/\ \    | |  \\           _-~`
      __--~~~  ,-/-==\\      (   | .  |~~~~|   | |   `\        ,'
   _-~       /'    |  \\     )__/==0==-\<>/   / /      \      /
 .'        /       |   \\      /~\___/~~\/  /' /        \   /'
/  ____  /         |    \`\.__/-~~   \  |_/'  /          \/'
/-'~    ~~~~~---__  |     ~-/~         ( )   /'        _--~`
                 \_|      /        _) | ;  ),   __--~~
                   '~~--_/      _-~/- |/ \   '-~ \
                  {\__--_/}    / \\_>-|)<__\      \
                  /'   (_/  _-~  | |__>--<__|      |
                 |   _/) )-~     | |__>--<__|      |
                 / /~ ,_/       / /__>---<__/      |
                o-o _//        /-~_>---<__-~      /
                (^(~          /~_>---<__-      _-~
               ,/|           /__>--<__/     _-~
            ,//('(          |__>--<__|     /                  .----_
           ( ( '))          |__>--<__|    |                 /' _---_~\
        `-)) )) (           |__>--<__|    |               /'  /     ~\`\
       ,/,'//( (             \__>--<__\    \            /'  //        ||
     ,( ( ((, ))              ~-__>--<_~-_  ~--____---~' _/'/        /'
   `~/  )` ) ,/|                 ~-_~>--<_/-__       __-~ _/
 ._-~//( )/ )) `   (  .      )    ~~-'_/_/ /~~~~~~~__--~
 ;'( ')/ ,)(       )           (           ~~~~~~~~~~
  ') '( (/             .  '   .   '  .  '  .
                 (    , )       (.   )  (   ',    )
                 .' ) ( . )    ,  ( ,     )   ( . (.  ,) , '.   '
               ). , ( .   (  ) ( , ')  .' (  ,    )   )   (' (,  ')
            (' )(_,) . ), ) _) _,')  (, ) '. )  ,. (' )('  (_ , , .
         _^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^_
      /                                o  *                           \
     |    _@TODO: https://github.com/LabOfOz/seeclarke/issues/11 ___   |
     |   |                                                         |   |
     |   |  > npm i 🧙                                            |   |
     |   |  > cd 🧙; yarn                                         |   |
     |   |  > yarn 🧙                                             |   |
     |   |  ...                                                    |   |
     |   |  ... configuring AI              [********]             |   |
     |   |  ... ai ready                                           |   |
     |   |  ...                                                    |   |
     |   |  🧙 - Point head or arm at tile to highlight it        |   |
     |   |     - Flip tile by "reaching" for it with head or arm   |   |
     |   |     - Flip all tiles to access techno-spellbook         |   |
     |   |                                                         |   |
     |   |  |---------------------------------------------------|  |   |
     |   |  |            |            |            |            |  |   |
     |   |  |------------|------------|------------|------------|  |   |
     |   |  |            |            |            |            |  |   |
     |   |  |------------|------------|------------|------------|  |   |
     |   |_________________________________________________________|   |
     |                                                                 |
      \_______________________________________________________________/
               \___________________________________________/
              _______________________________________________
           _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
        _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_
     _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-___    ,'""""'.__`. .-.-.-.`-_
  _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.,"""   """"'      `----. .-.-.-.-.`-_
_-'.-.-.-.-.-. .---.-. .------------.                  .-.---. .---.-.-.-.`-_
:----------------------------------,'        _.         `._-------------------:
`---._.---------------------------,'       ,'              `"""'.-------._.---'
                                 ,'    .-""`.    ,-'            `.         (
  |        )                    ,'    (        ,'                :         )\
   (      (              (    ,'     ,'           __,            `.       (()/(
   )\ )   )\ )          ,""""'     .' ;-.    ,  ,'  \             `"""".   ((_))
  (()/(  (()/(       (,'           `-(   `._(_,'     )_                `.
   /(_))  /(_))(     ,'         ,---. \ @ ;   \ @ _,'                   `.
        (       ,-""'         ,'      ,--'-    `;'                       `.
         )     ,'            ,'      (      `. ,'                          `.
      ( /(      ;            ,'        \    _,','                            `.
     )\())    ,'            ;          `--'  ,'                              `.
    )(_)\    ,'             ;          __    (                    ,           `.
             ;              `____...  `78b   `.                  ,'           ,'
             ;    ...----'''' )  _.-  .d8P    `.                ,'    ,'    ,'
_....----''' '.        _..--"_.-:.-' .'        `.             ,''.   ,' `--'
              `"""""""" _.-'' .-'`-.:..___...--' `-._      ,-"'   `-'
        _.--'       _.-'    .'   .' .'               `"""""
  __.-''        _.-'     .-'   .'  /
 '          _.-' .-'  .-'        .'
        _.-'  .-'  .-' .'  .'   /
    _.-'      .-'   .-'  .'   .'
_.-'       .-'    .'   .'    /
       _.-'    .-'   .'    .'
    .-'            .'

  COMING SOON
```

### As a Drop-In

```html
<script src="//unpkg.com/seeclarke/dist/seeclarke.min.js?autostart"></script>
```

[@TODO #12](https://github.com/LabOfOz/seeclarke/issues/12) **seeclarke.js** will be usable as a drop-in library that adds face-tracked cursors and pointers to any existing HTML5 project and is fully configurable via the `src` querystring. It can track one to dozens of people at once on a mobile device from pretty far away. **seeclarke.js** is made possible by [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) and [Tensorflow.js](https://js.tensorflow.org/).

> 🧚 Notice the `?autostart` flag; you can pass any [config](wiki/Options) to the script's `src` querystring for [@TODO #12 out-of-the-box configs](https://github.com/LabOfOz/seeclarke/issues/9). And because **seeclarke.js** emits native events, it'll probably work with your framework running on their platforms just...like...✨...that!

By default, dropping the above tag into any page will add the ability to:

- Scroll pages up by lifting your chin up high
- Scroll pages down by bowing your head down low

#### Events

This will also start [emitting several events](wiki/Events) which you can use to magically infuse your app! Indeed, you can use the cursor data or underlying vectors for a seriously-wide range of 2D, 3D, and real-world applications which we'll soon explore.

> 🧙 [@TODO](wiki/Events) **Some of the information you'll have access to on each tracked person, for every frame, includes:**
- [ ] Their head's:
  - [ ] (x, y, z) relative to the device
  - [ ] (pitch, yaw, rotation)
  - [ ] Many useful vectors
  - [ ] The screen's (x, y) we think the head is pointed towards
    - [ ] Or the environment's (x, y, z) data if it's supplied
- [ ] Ditto for the left and right forearms

#### Accessing Methods

A global `window.SeeClarke` class is made available for further [`new` instantiations](wiki/Instantiations) (in case you want to track from both the front and back cameras), and the instance object created when autostarted can be accessed via the globally created `window.seeclarke`. For most drop-in applications, you'll only care about the lowercased version.

> 🧚 For example, to create a new instance you would do `new SeeClarke(config)`, and to stop the autostarted one you'd use `seeclarke.stop()`.

#### Updating Config

[@TODO](https://github.com/LabOfOz/seeclarke/issues/13) You can update any of the initial configs at runtime with [`seeclarke.update()`](wiki/Updating-Config). When some of the configs that require external resources are changed (for example, changing `this.options.posenet.multiplier`), the current PoseNet model will continue running until the new one is ready. This allows your users to automatically update settings without needing to wait or restart the browser.

---

### Manual Start

```html
<script src="//unpkg.com/seeclarke/dist/seeclarke.min.js"></script>
```

If you want to manually configure and start **seeclarke** (for example, to delay tracking until after the user clicks a button) you can do so by excluding the `?autostart` querystring parameter, like above.

> 🧚 You can still include other query strings, but doing so just sets the [`SeeClarke.prototype.defaults`](wiki/Options]).

The process is then to:

```js
// Instantiate a new SeeClarke
// 🧙 We're just going with the defaults here but for 3 users since we still
// have that issue with the dragon!
let seeclarke = new SeeClarke({posenet: {maxUsers: 3}})

// Use the toggle() method to turn the webcam/tracker on/off
$('.toggle-webcam').click(() => seeclarke.toggle()) // tracking is on
$('.toggle-webcam').click(() => seeclarke.toggle()) // tracking is off
$('.toggle-webcam').click(() => seeclarke.toggle()) // tracking is on again
$('.toggle-webcam').click(() => seeclarke.toggle()) // tracking is off again

// Pass true or false to explicitly turn the webcam on (true) or off (false)
$('.turn-webcam-on').click(() => seeclarke.toggle(true)) // tracking is on
$('.turn-webcam-on').click(() => seeclarke.toggle(true)) // tracking is still on
$('.turn-webcam-off').click(() => seeclarke.toggle(false)) // tracking is off
$('.turn-webcam-off').click(() => seeclarke.toggle(false)) // tracking is still off
```

### Try the Bookmarklet

You can preview **seeclarke.js** on any site right now by [@TODO](https://github.com/LabOfOz/seeclarke/issues/14) <a href="javascript:(function()%7Bfunction%20callback()%7B%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22%2F%2Funpkg.com%2Fseeclarke%2Fdist%2Fseeclarke.min.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()">dragging this link to your bookmarks bar</a> or by [creating a bookmarklet](https://mrcoles.com/bookmarklet/) with the following code (then, visit any page and click the bookmarklet):

```
(function () {
  var $script = document.createElement('script')
  $script.src = '//unpkg.com/seeclarke/dist/seeclarke.min.js'
  document.body.appendChild($script)
})()
```

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
