/*!build time : 2015-01-29 4:50:18 PM*/
KISSY.add("kg/xplayer/2.0.5/plugin/status",function(){return{duration:0,currentTime:0,loadedTime:0,volume:.5,isPaused:!1,isPlaying:!1,pausePosition:0,readyState:0}}),KISSY.add("kg/xplayer/2.0.5/plugin/audio",function(a,b,c){var d=b.extend({initializer:function(){var a=this;a.audio=new Audio,a.audio.preload=!0,a._addEvent(),a.status=c},_addEvent:function(){var b=this;b.audio.addEventListener("loadstart",function(){a.log("Xplayer open"),b.fire("open")}),b.audio.addEventListener("timeupdate",function(a){b.status.currentTime=1e3*this.currentTime,b.status.duration=1e3*this.duration,b.fire(a.type,b.status)}),b.audio.addEventListener("ended",function(a){b.status.isPlaying=!1,b.status.isPaused=!1,b.fire(a.type)}),b.audio.addEventListener("progress",function(a){if(null!=b.audio.buffered&&b.audio.buffered.length){var c=b.audio.buffered.end(b.audio.buffered.length-1);b.fire(a.type,{progress:1e3*c,duration:1e3*b.audio.duration})}}),b.audio.addEventListener("error",function(a){b.fire(a.type)})},load:function(a){var b=this;b.set("src",a),b.audio.src=a,b.audio.volume=b.get("volume")},play:function(){var b=this;a.log(b.status.isPlaying),b.status.isPlaying||(b.status.isPlaying=!0,b.status.isPaused=!1,b.audio.play())},pause:function(){var a=this;a.status.isPaused||(a.status.isPlaying=!1,a.status.isPaused=!0,a.status.pausePosition=a.audio.currentTime,a.audio.pause())},stop:function(){var a=this;a.status.isPlaying=!1,a.status.isPaused=!1,a.status.pausePosition=0;try{a.audio.currentTime=0,a.audio.src=""}catch(b){}a.audio.pause()},setPosition:function(a){var b=this;b.audio.readyState>0&&(b.status.currentTime=a/1e3,b.audio.currentTime=b.status.currentTime,b.status.pausePosition=a),b.status.isPlaying||b.play()},setVolume:function(a){var b=this;b.status.volume=a,b.set("volume",a)}},{ATTRS:{volume:{value:.5,setter:function(a){return this.audio.volume=a,a},validator:function(b){return 1>=b&&b>=0&&a.isNumber(b)?!0:!1}},src:{}}});return d},{requires:["base","./status"]}),KISSY.add("kg/xplayer/2.0.5/plugin/audioSwf",function(a,b,c,d){function e(a){var b="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");a||(a=Math.floor(Math.random()*b.length));for(var c="",d=0;a>d;d++)c+=b[Math.floor(Math.random()*b.length)];return c}var f=window,g="../flash/xplayer.swf?v="+a.now();-1===window.location.href.indexOf("github.xiami.com")&&(g="//g.alicdn.com/kg/xplayer/2.0.5/xplayer.swf");var h=b.extend({initializer:function(){var b=this,h=e(10),i="Xplayer_"+h,j=document.createElement("DIV");j.id="XP_"+i,j.style.position="absolute",j.style.width="1px",j.style.height="1px",j.style.left="-1000px",j.style.top="-1000px",document.body.appendChild(j);var k={src:g,attrs:{width:1,height:1,id:"J_xiamiPlayerSwf_"+h},params:{allowScriptAccess:"always",wmode:"window",flashVars:{xplayerinterface:i}},render:j,version:"9.0"};b.status=d,b.interface=f[i]={open:function(){b.fire("open")},timeupdate:function(a){b.status.currentTime=a.currentTime,b.status.duration=a.duration,b.fire("timeupdate",a)},ended:function(a){b.status.isPlaying=!1,b.status.isPaused=!1,b.fire("ended",a)},progress:function(a){b.fire("progress",a)},error:function(){a.log("error"),b.fire("error")}},b.player=new c(k)},load:function(a){var b=this;b.set("src",a),b.player.callSWF("jsSrc",[a])},play:function(){var b=this;a.log(b.status.isPlaying,"","\u662f\u5426\u6b63\u5728\u64ad\u653e"),b.status.isPlaying||(b.status.isPlaying=!0,b.status.isPaused=!1,b.player.callSWF("jsPlay"))},pause:function(){var a=this;a.status.isPaused||(a.status.isPlaying=!1,a.status.isPaused=!0,a.player.callSWF("jsPause"))},stop:function(){var a=this;a.status.isPlaying=!1,a.status.isPaused=!1,a.status.pausePosition=0,a.player.callSWF("jsStop")},setPosition:function(a){var b=this;b.status.pausePosition=a,b.player.callSWF("jsPosition",[Number(a)]),b.status.isPlaying||b.play()},setVolume:function(a){var b=this;b.status.volume=a,b.player.callSWF("setVolume",[Number(v)])}},{ATTR:{volume:{value:1,setter:function(a){return this.audio.volume=a,a},validator:function(b){return 1>=b&&b>=0&&a.isNumber(b)?!0:!1}},src:{}}});return h},{requires:["base","swf","./status"]}),KISSY.add("kg/xplayer/2.0.5/index",function(a,b,c){"use strict";function d(b){var c=this;c.config=a.mix({autoplay:!1,forceFlash:!1,forceAudio:!1},b,!0),c._init()}var e="";return d.prototype={_init:function(){var a=this;if(a.track=null,a.player=null,a.config.forceAudio&&!a.config.forceFlash&&(a.player=new b),a.config.forceFlash&&!a.config.forceAudio&&(a.player=new c),null===a.player){var d=a.supportAudio();a.player=d?new b:new c}return a.status=a.player.status,a},load:function(a){var b=this;if(!a.url||a.url==e)throw new Error("Can't find a URL parameter");return b.stop(),b.track=a,b.player.load(b.track.url),b.config.autoplay&&b.play(),b},on:function(a,b){var c=this;return c.player.on(a,b),c},play:function(b){var c=this;return(isNaN(b)||a.isUndefined(b))&&(b=0),c.player.play(b),c},stop:function(){var a=this;return a.player.stop(),a},pause:function(){var a=this;return a.player.pause(),a},setPosition:function(b){var c=this;return a.isUndefined(b)?c:(c.player.setPosition(b),c)},getTrack:function(){var a=this;return a.track},setVolume:function(a){var b=this;b.player.setVolume(a)},supportAudio:function(){try{var b=document.createElement("audio");return!(!b.canPlayType||!b.canPlayType("audio/mpeg").replace(/no/,""))}catch(c){a.log(c)}return!1}},d},{requires:["./plugin/audio","./plugin/audioSwf"]});