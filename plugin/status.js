/**
 * @description 播放器自身状态属性
 * @author 宝码<nongyoubao@alibaba-inc.com>
 * @namespace Xplayer.status
 */

/** @lends Xplayer.status.prototype */
module.exports = {
  /**
   * 歌曲时长 毫秒
   * @type {Number} 
   */
  duration: 0,
  /**
   * 当前歌曲时长 毫秒
   * @type {Number}   
   */
  currentTime: 0,
  /**
   * 已加载歌曲时长 毫秒
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
  isPaused: false,
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
