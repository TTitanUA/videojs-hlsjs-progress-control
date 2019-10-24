# videojs-hlsjs-progress-control

Modify standard progress control for the better streaming experience.

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-hlsjs-progress-control
```

## Usage

To include videojs-hlsjs-progress-control on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-contrib-hlsjs.min.js"></script>
<script src="//path/to/videojs-hlsjs-progress-control.min.js"></script>
<script>
  var player = videojs(
    'my-video',
    {
      autoplay: true,
      liveui: true,
      controls: true,
    }
  );

  player.hlsjsProgressControl();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-hlsjs-progress-control via npm and `require` the plugin as you would any other module.

```js
var videojs = require(
    'video.js',
    {
      autoplay: true,
      liveui: true,
      controls: true,
    }
);

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-contrib-hls.js');
require('videojs-hlsjs-progress-control');

var player = videojs(
  'my-video',
    {
      autoplay: true,
      liveui: true,
      controls: true,
    }
  );

player.hlsjsProgressControl();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-contrib-hls.js', 'videojs-hlsjs-progress-control'], function(videojs) {
  var player = videojs(
    'my-video',
    {
      autoplay: true,
      liveui: true,
      controls: true,
    }
  );

  player.hlsjsProgressControl();
});
```

## License

MIT. Copyright (c) Taras Prokofiev &lt;taras.prokofiev@devit-team.com&gt;


[videojs]: http://videojs.com/
