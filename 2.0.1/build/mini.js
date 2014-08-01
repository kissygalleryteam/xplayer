/*
combined files : 

kg/xplayer/2.0.1/plugin/status
kg/xplayer/2.0.1/plugin/audio
kg/xplayer/2.0.1/mini

*/
/**
 * @description 播放器自身状态属性
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @namespace Xplayer.status
 */
KISSY.add('kg/xplayer/2.0.1/plugin/status',function(S) {
    /** @lends Xplayer.status.prototype */
    return {
        /**
         * 歌曲时长
         * @type {Number}
         */
        duration: 0,
        /**
         * 当前歌曲时长
         * @type {Number}
         */
        currentTime: 0,
        /**
         * 已加载歌曲时长
         * @type {Number}
         */
        loadedTime: 0,
        // *
        //  * 已经加载歌曲市场 百分比
        //  * @type {Number}

        // loadedPercent: 0,
        /**
         * 当前音量
         * @type {Number}
         */
        volume: 0.5,
        // *
        //  * 静音状态
        //  * @type {Boolean}

        // muted: false,
        /**
         * 暂停状态
         * @type {Boolean}
         */
        isPaused: true,
        /**
         * 播放状态
         * @type {Boolean}
         */
        isPlaying: false,
        /**
         * 暂停点位置
         * @type {Number}
         */
        pausePosition: 0,

        readyState: 0 //1:HAVE_NOTHING 2:HAVE_METADATA 3.HAVE_CURRENT_DATA 4.HAVE_FUTURE_DATA 5.HAVE_ENOUGH_DATA
    }
});

/**
 * @description Audio API 封装
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @class Xplayer.audio
 * @extends {KISSY.Base}
 **/
KISSY.add('kg/xplayer/2.0.1/plugin/audio',function(S, Base, Status) {

    var Html5Audio = Base.extend(
        /** @lends Xplayer.audio */
        {
            initializer: function() {
                var self = this;
                self.audio = new Audio();
                self.audio.preload = true;
                self._addEvent();
                self.status = Status;
            },
            _addEvent: function() {
                var self = this;


                // 正在播放
                self.audio.addEventListener("timeupdate", function(event) {
                    self.status.currentTime = this.currentTime;
                    self.status.duration = this.duration;
                    self.fire(event.type, self.status);
                });
                // 播放完成
                self.audio.addEventListener("ended", function(event) {
                    self.status.isPlaying = false;
                    self.status.isPaused = false;
                    self.fire(event.type);
                });
                // 加载中
                self.audio.addEventListener("progress", function(event) {
                    if (self.audio.buffered != null && self.audio.buffered.length) {
                        // Ensure `loadStarted()` is only called once.
                        var durationLoaded = self.audio.buffered.end(self.audio.buffered.length - 1);
                        self.fire(event.type, {
                            'progress': durationLoaded * 1000,
                            'duration': self.audio.duration * 1000
                        });
                    }
                });
                // 遇到错误
                self.audio.addEventListener("error", function(event) {
                    self.fire(event.type);
                });
            },
            load: function(url) {
                var self = this;
                self.set('src', url);
                self.audio.src = url;
                self.audio.volume = self.get('volume');
                //self.audio.load();
            },
            /**
             * 播放
             */
            play: function() {
                var self = this;
                S.log(self.status.isPlaying)
                if (!self.status.isPlaying) {
                    self.status.isPlaying = true;
                    self.status.isPaused = false;
                    self.audio.play();
                }
            },
            /**
             * 暂停
             */
            pause: function() {
                var self = this;
                if (!self.status.isPaused) {
                    self.status.isPlaying = false;
                    self.status.isPaused = true;
                    self.status.pausePosition = self.audio.currentTime;
                    self.audio.pause();
                }
            },
            /**
             * 停止
             */
            stop: function() {
                var self = this;
                self.status.isPlaying = false;
                self.status.isPaused = false;
                self.status.pausePosition = 0;
                try {
                    self.audio.currentTime = 0;
                } catch (e) {};
                self.audio.pause();
            },
            /**
             * 设置播放头位置
             * @param  {Number} val 毫秒值
             */
            setPosition: function(val) {
                var self = this;
                if (self.audio.readyState > 0) {
                    self.status.currentTime = val / 1000;
                    self.audio.currentTime = self.status.currentTime;
                    self.status.pausePosition = val;
                };
                if (!self.status.isPlaying) {
                    self.play();
                };
            },
            setVolume: function(val) {
                var self = this;
                self.status.volume = val;
                self.set('volume', val);
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
        })

    return Html5Audio;
}, {
    requires: ['base', './status']
});

/**
 * @description MP3 播放核心插件
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @version 1.0
 * @copyright www.noyobo.com
 */
KISSY.add('kg/xplayer/2.0.1/mini',function(S, PlayerAudio) {
    'use strict';
    var EMPTY = '';
    /**
     * @name Xplayer
     * @class MP3播放组件
     * @constructor
     * @param {Object} [config] 播放器参数
     * @param {Boolean} [config.autoplay=false] 是否自动播放
     * @requires KISSY>1.4.0
     * @see http://docs.kissyui.com/
     * @example
     * 实例化 Xplayer
     * ```
     * var player = new Xplayer({
     *     'autoplay' : true
     * });
     * ```
     */

    function Xplayer(config) {
        var self = this;
        /**
         * 配置项
         * @type {Object}
         */
        self.config = S.mix({
            'autoplay': false
        }, config, true);
        // 立即初始化
        self._init();
    };

    Xplayer.prototype = {
        /**
         * 初始化Xplayer对象
         * @method Xplayer._init
         * @return {Xplayer} Xplayer对象
         * @private
         */
        _init: function() {
            var self = this;
            /**
             * Xplayer实例属性 Audio || swf
             * @name Xplayer.player
             * @readOnly
             * @type {Audio|Swf}
             */
            self.player = new PlayerAudio()
                //self.player = new PlayerSwf();

            /**
             * Xplayer实例属性,正在播放的歌曲 TrackVo 对象
             * @type {Object}
             * @name Xplayer.track
             * @readOnly
             * @example
             * Xplayer.getTrack() // {trackVo}
             * @see getTrack()
             */
            self.track = null;
            return self;
        },
        /**
         * 加载要播放的歌曲
         * @method Xplayer.load
         * @param  {Object} track 歌曲JSON对象
         * @param  {String} track.url 歌曲的MP3地址,必填!!
         * @return {Xplayer} Xplayer
         * @public
         * @example
         * var player = Xplayer();
         * plyaer.load({
         *     'url': 'http://example.com/kissy.mp3'
         * })
         */
        load: function(track) {
            var self = this;
            if (!track.url || track.url == EMPTY) {
                throw new Error("Can't find a URL parameter");
                return self;
            }
            self.stop();
            self.track = track;

            self.player.load(self.track.url);

            if (self.config.autoplay) {
                self.play();
            };
            return self;
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
         * var player = new Xplayer();
         * player.on("ended", function(e){
         *     alert( '播放结束了,需要做什么操作呢?' );
         * });
         */
        on: function(type, callback) {
            var self = this;
            self.player.on(type, callback);
            return self;
        },
        /**
         * 开始播放
         * @method Xplayer.play
         * @param {Number} [time=0] 从第几秒开始播放
         * @return {Xplayer}
         */
        play: function(time) {
            var self = this;
            if (isNaN(time) || S.isUndefined(time)) {
                time = 0;
            }
            self.player.play(time);
            return self;
        },
        /**
         * 停止播放
         * @method Xplayer.stop
         * @return {Xplayer} Xplayer
         */
        stop: function() {
            var self = this;
            self.player.stop();
            return self;
        },
        /**
         * 暂停播放
         * @method Xplayer.pause
         * @return {Xplayer} Xplayer
         */
        pause: function() {
            var self = this;
            self.player.pause();
            return self;
        },
        /**
         * 设置播放头位置
         * @method Xplayer.setPosition

         * @param {Number} [val=required] 播放头位置,单位S
         * @return {Xplayer} Xplayer
         */
        setPosition: function(val) {
            var self = this;
            if (S.isUndefined(val)) return self;
            self.player.setPosition(val);
            return self;
        },
        /**
         * 获取当前播放器TrackVo对象
         * @method Xplayer.getTrack
         * @return {Object} TrackVo
         */
        getTrack: function() {
            var self = this;
            return self.track;
        },
        /**
         * 设置音量
         * @method Xplayer.setVolume
         * @param {Number} val 音量大小
         */
        setVolume: function(val) {
                var self = this;
                self.player.setVolume(val)
            }
            /**
             * 正在播放中, 触发该事件
             * @event Xplayer.timeupdate
             * @param {Object} [data={currentTime:0, duration:1}] 返回内容
             * @return {Object} 返回状态
             */
            /**
             * 正在加载中, 触发该事件
             * @event Xplayer.progress
             * @param {Object} [data={progress:0, duration:1}] 返回内容
             * @return {Object} 返回状态
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
    return Xplayer;
}, {
    requires: ['./plugin/audio']
});

