KISSY.add('kg/xplayer/3.0.0/lib/audioSwf',["base","./swfobject","./status"],function(S ,require, exports, module) {
 /**
 * @description Flash 播放器封装
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @class Xplayer.FlashPlayer
 * @extends {KISSY.Base}
 **/
'use strict';
var Base = require('base');
var swfobject = require('./swfobject');
var Status = require('./status');
function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }
  var str = '';
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};
var win = window;
var swfurl = '//g.alicdn.com/kg/xplayer/3.0.0/xplayer.swf';
if (window.location.href.indexOf('ks-debug') !== -1) {
  swfurl = "../flash/xplayer.swf?v=" + S.now();
};

var FlashPlayer = Base.extend({
  initializer: function() {
    var self = this;
    var swfid = randomString(10);
    var XPLAYERINTERFACE = 'Xplayer_' + swfid;
    var divid = 'XP_' + XPLAYERINTERFACE;
    var wrap = document.createElement('DIV');
    var swfWrap = document.createElement('DIV');
    swfWrap.id = divid + '_swf';
    wrap.appendChild(swfWrap);
    wrap.id = divid;
    wrap.style.position = 'absolute';
    wrap.style.width = '1px';
    wrap.style.height = '1px';
    wrap.style.left = '-1000px';
    wrap.style.top = '-1000px';
    document.body.appendChild(wrap);
    var swfConfig = {
      src: swfurl,
      attrs: {
        width: 1,
        height: 1,
        id: "J_xiamiPlayerSwf_" + swfid
      },
      params: {
        allowScriptAccess: "always",
        wmode: "window",
        flashVars: {
          'xplayerinterface': XPLAYERINTERFACE
        }
      },
      render: wrap,
      version: "9.0"
    };

    self.status = Status;
    self.interface = win[XPLAYERINTERFACE] = {
      open: function() {
        self.fire('open')
      },
      timeupdate: function(data) {
        self.status.currentTime = data.currentTime;
        self.status.duration = data.duration;
        self.fire('timeupdate', data)
      },
      ended: function(data) {
        self.status.isPlaying = false;
        self.status.isPaused = false;
        self.fire('ended', data)
      },
      progress: function(data) {
        self.fire('progress', data)
      },
      error: function() {
        S.log('error');
        self.fire('error');
      }
    }

    self.player = null;
    var el = document.getElementById(divid + '_swf');
    swfobject.embedSWF(swfurl, el, 1, 1, 9.0, '', {
      'xplayerinterface': XPLAYERINTERFACE
    }, {
      allowScriptAccess: "always",
      wmode: "window"
    }, {
      id: "J_xiamiPlayerSwf_" + swfid
    }, function(e) {
      self.player = e.ref;
    });

  },
  load: function(url) {
    var self = this;
    self.set('src', url);
    self.player.jsSrc(url);
  },
  play: function() {
    var self = this;
    S.log(self.status.isPlaying, '', "是否正在播放")
    if (!self.status.isPlaying) {
      self.status.isPlaying = true;
      self.status.isPaused = false;
      self.player.jsPlay()
    }
  },
  pause: function() {
    var self = this;
    if (!self.status.isPaused) {
      self.status.isPlaying = false;
      self.status.isPaused = true;
      //self.status.pausePosition = self.audio.currentTime;
      self.player.jsPause()
    }
  },
  stop: function() {
    var self = this;
    self.status.isPlaying = false;
    self.status.isPaused = false;
    self.status.pausePosition = 0;
    self.player.jsStop()
  },
  setPosition: function(val) {
    var self = this;
    self.status.pausePosition = val;
    self.player.jsPosition(Number(val));
    if (!self.status.isPlaying) {
      self.play();
    };
  },
  setVolume: function(val) {
    var self = this;
    self.status.volume = val;
    self.player.setVolume(Number(val));
  }
}, {
  ATTR:
  /**
   * @lends Xplayer.FlashPlayer.prototype
   */
  {
    /**
     * volume
     * @type {Number}
     * @default 1
     */
    volume: {
      value: 1,
      setter: function(v) {
        this.audio.volume = v;
        return v;
      },
      validator: function(v) {
        if (v <= 1 && v >= 0 && S.isNumber(v)) {
          return true
        }
        return false;
      }
    },
    /**
     * mp3 location
     * @type {String}
     * @default empty
     */
    src: {}
  }
});

module.exports = FlashPlayer;

});