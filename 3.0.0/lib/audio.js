/**
 * @description Audio API 封装
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @class Xplayer.audio
 * @extends {KISSY.Base}
 **/

var Base = require('base')
var Status = require('./status')
var Html5Audio = Base.extend(
  /** @lends Xplayer.audio */
  {
    initializer: function() {
      var self = this
      self.audio = new Audio()
      self.audio.preload = true
      self._addEvent()
      self.status = Status
    },
    _addEvent: function() {
      var self = this

      // 正在播放
      self.audio.addEventListener('loadstart', function() {
        S.log('Xplayer open')
        self.fire('open')
      })
      // 正在播放
      self.audio.addEventListener('timeupdate', function(event) {
        self.status.currentTime = this.currentTime * 1000
        self.status.duration = this.duration * 1000
        self.fire(event.type, self.status)
      })
      // 播放完成
      self.audio.addEventListener('ended', function(event) {
        self.status.isPlaying = false
        self.status.isPaused = false
        self.fire(event.type)
      })
      // 加载中
      self.audio.addEventListener('progress', function(event) {
        // jshint -W041
        if (self.audio.buffered != null && self.audio.buffered.length) {
          // Ensure `loadStarted()` is only called once.
          var durationLoaded = self.audio.buffered.end(self.audio.buffered.length - 1)
          self.fire(event.type, {
            'progress': durationLoaded * 1000,
            'duration': self.audio.duration * 1000
          })
        }
      })
      // 遇到错误
      self.audio.addEventListener('error', function(event) {
        self.fire(event.type)
      })
    },
    load: function(url) {
      var self = this
      self.set('src', url)
      self.audio.src = url
      self.audio.volume = self.get('volume')
      //self.audio.load()
    },
    /**
     * 播放
     */
    play: function() {
      var self = this
      S.log(self.status.isPlaying)
      if (!self.status.isPlaying) {
        self.status.isPlaying = true
        self.status.isPaused = false
        self.audio.play()
      }
    },
    /**
     * 暂停
     */
    pause: function() {
      var self = this
      if (!self.status.isPaused) {
        self.status.isPlaying = false
        self.status.isPaused = true
        self.status.pausePosition = self.audio.currentTime
        self.audio.pause()
      }
    },
    /**
     * 停止
     */
    stop: function() {
      var self = this
      self.status.isPlaying = false
      self.status.isPaused = false
      self.status.pausePosition = 0
      try {
        self.audio.currentTime = 0
      } catch (e) {}
      self.audio.pause()
    },
    /**
     * 设置播放头位置
     * @param  {Number} val 毫秒值
     */
    setPosition: function(val) {
      var self = this
      if (self.audio.readyState > 0) {
        self.status.currentTime = val / 1000
        self.audio.currentTime = self.status.currentTime
        self.status.pausePosition = val
      }
      if (!self.status.isPlaying) {
        self.play()
      }
    },
    setVolume: function(val) {
      var self = this
      self.status.volume = val
      self.set('volume', val)
    }
  }, {
    ATTRS:
    /**
     * @lends Xplayer.audio.prototype
     */
    {
      /**
       * volume
       * @type {Number}
       * @default 1
       */
      volume: {
        value: 0.5,
        setter: function(v) {
          this.audio.volume = v
          return v
        },
        validator: function(v) {
          if (v <= 1 && v >= 0 && S.isNumber(v)) {
            return true
          }
          return false
        }
      },
      /**
       * mp3 location
       * @type {String}
       * @default empty
       */
      src: {}
    }
  })

module.exports = Html5Audio
