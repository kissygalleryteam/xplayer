KISSY.add('kg/xplayer/2.1.0/index',["./plugin/audio","./plugin/audioSwf"],function(S ,require, exports, module) {
 /**
 * @description MP3 播放核心插件
 * @author 宝码<nongyoubao@alibaba-inc.com>
 */

'use strict'
var EMPTY = ''
var PlayerAudio = require('./plugin/audio')
var PlayerSwf = require('./plugin/audioSwf')
/**
 * @name Xplayer
 * @class MP3播放组件
 * @constructor
 * @param {Object} [config] 播放器参数
 * @param {Boolean} [config.autoplay=false] 是否自动播放
 * @param {Boolean} [config.forceFlash=false] 强制使用Flash
 * @param {Boolean} [config.forceAudio=false] 强制使用Audio
 * @requires KISSY>1.4.0
 * @see http://docs.kissyui.com/
 * @example
 * 实例化 Xplayer
 * ```
 * var player = new Xplayer({
 *     'autoplay' : true
 * })
 * ```
 */

function Xplayer(config) {
  var self = this
  /**
   * 配置项
   * @type {Object}
   */
  self.config = S.mix({
    'autoplay': false,
    'forceFlash': false,
    'forceAudio': false
  }, config, true)
  // 立即初始化
  self._init()
}

Xplayer.prototype = {
  /**
   * 初始化Xplayer对象
   * @method Xplayer._init
   * @return {Xplayer} Xplayer对象
   * @private
   */
  _init: function() {
    var self = this
    /**
     * Xplayer实例属性 Audio || swf
     * @name Xplayer.player
     * @readOnly
     * @type {Audio|Swf}
     */
    self.track = null
    self.player = null
    if (self.config.forceAudio && !self.config.forceFlash) {
      self.player = new PlayerAudio()
    }
    if (self.config.forceFlash && !self.config.forceAudio) {
      self.player = new PlayerSwf()
    }
    if (self.player === null) {
      var isSupport = self.supportAudio()
      self.player = isSupport ? new PlayerAudio() : new PlayerSwf()
    }
    self.status = self.player.status // 引用
    //self.player = new PlayerSwf()
    /**
     * Xplayer实例属性,正在播放的歌曲 TrackVo 对象
     * @type {Object}
     * @name Xplayer.track
     * @readOnly
     * @example
     * Xplayer.getTrack() // {trackVo}
     * @see getTrack()
     */

    return self
  },
  /**
   * 加载要播放的歌曲
   * @method Xplayer.load
   * @param  {Object} track 歌曲JSON对象
   * @param  {String} track.url 歌曲的MP3地址,必填!!
   * @return {Xplayer} Xplayer
   * @public
   * @example
   * var player = Xplayer()
   * plyaer.load({
   *     'url': 'http://example.com/kissy.mp3'
   * })
   */
  load: function(track) {
    var self = this
    if (!track.url || track.url == EMPTY) {
      throw new Error('Can\'t find a URL parameter')
      return self
    }
    self.stop()
    self.track = track

    self.player.load(self.track.url)

    if (self.config.autoplay) {
      self.play()
    }
    return self
  },
  /**
   * 监听事件的跳板实现
   * @method Xplayer.on
   * @param  {String}   event   事件名称
   * @param  {String} event.timeupdate 更新播放进度
   * @param  {String} event.ended 播放完成
   * @param  {Function} callback 回调函数
   * @return {Xplayer}            Xplayer对象
   * @example
   * var player = new Xplayer()
   * player.on("ended", function(e){
   *     alert( '播放结束了,需要做什么操作呢?' )
   * })
   */
  on: function(type, callback) {
    var self = this
    self.player.on(type, callback)
    return self
  },
  /**
   * 开始播放
   * @method Xplayer.play
   * @param {Number} [time=0] 从第几秒开始播放
   * @return {Xplayer}
   */
  play: function(time) {
    var self = this
    if (isNaN(time) || S.isUndefined(time)) {
      time = 0
    }
    self.player.play(time)
    return self
  },
  /**
   * 停止播放
   * @method Xplayer.stop
   * @return {Xplayer} Xplayer
   */
  stop: function() {
    var self = this
    self.player.stop()
    return self
  },
  /**
   * 暂停播放
   * @method Xplayer.pause
   * @return {Xplayer} Xplayer
   */
  pause: function() {
    var self = this
    self.player.pause()
    return self
  },
  /**
   * 设置播放头位置
   * @method Xplayer.setPosition

   * @param {Number} [val=required] 播放头位置,单位S
   * @return {Xplayer} Xplayer
   */
  setPosition: function(val) {
    var self = this
    if (S.isUndefined(val)) {
      return self
    }
    self.player.setPosition(val)
    return self
  },
  /**
   * 获取当前播放器TrackVo对象
   * @method Xplayer.getTrack
   * @return {Object} TrackVo
   */
  getTrack: function() {
    var self = this
    return self.track
  },
  /**
   * 设置音量
   * @method Xplayer.setVolume
   * @param {Number} val 音量大小
   */
  setVolume: function(val) {
    var self = this
    self.player.setVolume(val)
  },
  /**
   * 支持Audio检测
   * @method Xplayer.supportAudio
   * @return {Boolean} 是否支持Audio
   */
  supportAudio: function() {
      // var self = this
      //audio/mpeg
      //application/octet-stream
      try {
        var a = document.createElement('audio')
        return !!(a.canPlayType &&
          a.canPlayType('audio/mpeg').replace(/no/, ''))
      } catch (e) {
        S.log(e)
      }
      return false
    }
    /**
     * 正在播放中, 触发该事件
     * @event Xplayer.timeupdate
     * @param {Object} [data={currentTime:0, duration:1}] 单位毫秒
     * @return {Object} 返回状态
     */
    /**
     * 正在加载中, 触发该事件
     * @event Xplayer.progress
     * @param {Object} [data={progress:0, duration:1}] 单位毫秒
     * @return {Object} 返回状态
     */
    /**
     * 播放开始(加载文件), 触发该事件
     * @event Xplayer.open
     */
    /**
     * 播放结束, 触发该事件
     * @event Xplayer.ended
     */
    /**
     * 播放错误, 触发该事件
     * @event Xplayer.error
     */
}
module.exports = Xplayer

});