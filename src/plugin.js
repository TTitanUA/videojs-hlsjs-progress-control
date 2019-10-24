import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import ProgressControlHlsJs from "./components/ProgressControlHlsJs";
import LiveButtonHlsJs from "./components/LiveButtonHlsJs";
import CachedButtonHlsJs from "./components/CachedButtonHlsJs";

const Plugin = videojs.getPlugin('plugin');



// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class HlsjsProgressControl extends Plugin {

  /**
   * Create a HlsjsProgressControl plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);
    this.activeLiveMode = this.activeLiveMode.bind(this);
    this.activateCachedMode = this.activateCachedMode.bind(this);
    this.progressControlComponent = null;
    this.liveButtonComponent = null;
    this.cachedButtonComponent = null;

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-hlsjs-progress-control');
    });

    this.player.on('pause', this.activateCachedMode);

    this.initControl();
  }

  activeLiveMode() {

    try {
      this.showLiveControl();
      this.hideProgressControl();
      this.player.liveTracker.seekToLiveEdge();
    } catch (e) {
      this.player.log.warn(e.message)
    }
  }

  activateCachedMode() {
    this.showProgressControl();
    this.hideLiveControl();
  }

  initControl() {
    const controlBar = this.player.getChild('ControlBar');
    const space = controlBar.addChild('Component', {}, 2);
    space.addClass('vjs-hlsjs-controls-holder');

    this.removeDefaultControls();

    this.cachedButtonComponent = space.addChild('CachedButtonHlsJs', {
      clickHandler: this.activeLiveMode
    }, 1);
    this.cachedButtonComponent.hide();

    this.liveButtonComponent = space.addChild('LiveButtonHlsJs', {
      clickHandler: this.activateCachedMode
    }, 1);
    this.liveButtonComponent.hide();

    this.progressControlComponent = space.addChild('ProgressControlHlsJs', {}, 2);
    this.progressControlComponent.hide();

    this.activeLiveMode();
  }

  removeDefaultControls() {
    const controlBar = this.player.getChild('ControlBar');
    controlBar.removeChild('ProgressControl');
    controlBar.removeChild('SeekToLive');
    controlBar.removeChild('LiveDisplay');
  }

  showProgressControl() {
    this.progressControlComponent.show();
    this.cachedButtonComponent.show();
  }

  hideProgressControl() {
    this.progressControlComponent.hide();
    this.cachedButtonComponent.hide();
  }

  showLiveControl() {
    this.liveButtonComponent.show();
  }

  hideLiveControl() {
    this.liveButtonComponent.hide();
  }

}

// Define default values for the plugin's `state` object here.
HlsjsProgressControl.defaultState = {};

// Include the version number.
HlsjsProgressControl.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('hlsjsProgressControl', HlsjsProgressControl);
videojs.registerComponent('ProgressControlHlsJs', ProgressControlHlsJs);
videojs.registerComponent('LiveButtonHlsJs', LiveButtonHlsJs);
videojs.registerComponent('CachedButtonHlsJs', CachedButtonHlsJs);

export default HlsjsProgressControl;
