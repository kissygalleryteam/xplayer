KISSY.add("kg/xplayer/3.0.0/index",["base"],function(e,t,n,i){var a,r,s,o,u,l=t("base");a=function(e){return e={duration:0,currentTime:0,loadedTime:0,volume:.5,isPaused:!1,isPlaying:!1,pausePosition:0,readyState:0}}(),r=function(e){var t=function(){function e(){if(!z&&document.getElementsByTagName("body")[0]){try{var e,t=g("span");t.style.display="none",e=$.getElementsByTagName("body")[0].appendChild(t),e.parentNode.removeChild(e),e=null,t=null}catch(n){return}z=!0;for(var i=D.length,a=0;i>a;a++)D[a]()}}function n(e){z?e():D[D.length]=e}function i(e){if(typeof U.addEventListener!==I)U.addEventListener("load",e,!1);else if(typeof $.addEventListener!==I)$.addEventListener("load",e,!1);else if(typeof U.attachEvent!==I)b(U,"onload",e);else if("function"==typeof U.onload){var t=U.onload;U.onload=function(){t(),e()}}else U.onload=e}function a(){var e=$.getElementsByTagName("body")[0],t=g(B);t.setAttribute("style","visibility: hidden;"),t.setAttribute("type",V);var n=e.appendChild(t);if(n){var i=0;!function a(){if(typeof n.GetVariable!==I)try{var s=n.GetVariable("$version");s&&(s=s.split(" ")[1].split(","),K.pv=[w(s[0]),w(s[1]),w(s[2])])}catch(o){K.pv=[8,0,0]}else if(10>i)return i++,void setTimeout(a,10);e.removeChild(t),n=null,r()}()}else r()}function r(){var e=X.length;if(e>0)for(var t=0;e>t;t++){var n=X[t].id,i=X[t].callbackFn,a={success:!1,id:n};if(K.pv[0]>0){var r=m(n);if(r)if(!P(X[t].swfVersion)||K.wk&&K.wk<312)if(X[t].expressInstall&&o()){var d={};d.data=X[t].expressInstall,d.width=r.getAttribute("width")||"0",d.height=r.getAttribute("height")||"0",r.getAttribute("class")&&(d.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(d.align=r.getAttribute("align"));for(var c={},f=r.getElementsByTagName("param"),p=f.length,v=0;p>v;v++)"movie"!==f[v].getAttribute("name").toLowerCase()&&(c[f[v].getAttribute("name")]=f[v].getAttribute("value"));u(d,c,n,i)}else l(r),i&&i(a);else T(n,!0),i&&(a.success=!0,a.ref=s(n),a.id=n,i(a))}else if(T(n,!0),i){var y=s(n);y&&typeof y.SetVariable!==I&&(a.success=!0,a.ref=y,a.id=y.id),i(a)}}}function s(e){var t=null,n=m(e);return n&&"OBJECT"===n.nodeName.toUpperCase()&&(t=typeof n.SetVariable!==I?n:n.getElementsByTagName(B)[0]||n),t}function o(){return!G&&P("6.0.65")&&(K.win||K.mac)&&!(K.wk&&K.wk<312)}function u(e,t,n,i){var a=m(n);if(n=h(n),G=!0,N=i||null,x={success:!1,id:n},a){"OBJECT"===a.nodeName.toUpperCase()?(S=d(a),C=null):(S=a,C=n),e.id=M,(typeof e.width===I||!/%$/.test(e.width)&&w(e.width)<310)&&(e.width="310"),(typeof e.height===I||!/%$/.test(e.height)&&w(e.height)<137)&&(e.height="137");var r=K.ie?"ActiveX":"PlugIn",s="MMredirectURL="+encodeURIComponent(U.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+r+"&MMdoctitle="+encodeURIComponent($.title.slice(0,47)+" - Flash Player Installation");if(typeof t.flashvars!==I?t.flashvars+="&"+s:t.flashvars=s,K.ie&&4!=a.readyState){var o=g("div");n+="SWFObjectNew",o.setAttribute("id",n),a.parentNode.insertBefore(o,a),a.style.display="none",v(a)}f(e,t,n)}}function l(e){if(K.ie&&4!=e.readyState){e.style.display="none";var t=g("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(d(e),t),v(e)}else e.parentNode.replaceChild(d(e),e)}function d(e){var t=g("div");if(K.win&&K.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(B)[0];if(n){var i=n.childNodes;if(i)for(var a=i.length,r=0;a>r;r++)1==i[r].nodeType&&"PARAM"===i[r].nodeName||8==i[r].nodeType||t.appendChild(i[r].cloneNode(!0))}}return t}function c(e,t){var n=g("div");return n.innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+e+"'>"+t+"</object>",n.firstChild}function f(e,t,n){var i,a=m(n);if(n=h(n),K.wk&&K.wk<312)return i;if(a){var r,s,o,u=g(K.ie?"div":B);typeof e.id===I&&(e.id=n);for(o in t)t.hasOwnProperty(o)&&"movie"!==o.toLowerCase()&&p(u,o,t[o]);K.ie&&(u=c(e.data,u.innerHTML));for(r in e)e.hasOwnProperty(r)&&(s=r.toLowerCase(),"styleclass"===s?u.setAttribute("class",e[r]):"classid"!==s&&"data"!==s&&u.setAttribute(r,e[r]));K.ie?W[W.length]=e.id:(u.setAttribute("type",V),u.setAttribute("data",e.data)),a.parentNode.replaceChild(u,a),i=u}return i}function p(e,t,n){var i=g("param");i.setAttribute("name",t),i.setAttribute("value",n),e.appendChild(i)}function v(e){var t=m(e);t&&"OBJECT"===t.nodeName.toUpperCase()&&(K.ie?(t.style.display="none",function n(){if(4==t.readyState){for(var e in t)"function"==typeof t[e]&&(t[e]=null);t.parentNode.removeChild(t)}else setTimeout(n,10)}()):t.parentNode.removeChild(t))}function y(e){return e&&e.nodeType&&1===e.nodeType}function h(e){return y(e)?e.id:e}function m(e){if(y(e))return e;var t=null;try{t=$.getElementById(e)}catch(n){}return t}function g(e){return $.createElement(e)}function w(e){return parseInt(e,10)}function b(e,t,n){e.attachEvent(t,n),H[H.length]=[e,t,n]}function P(e){e+="";var t=K.pv,n=e.split(".");return n[0]=w(n[0]),n[1]=w(n[1])||0,n[2]=w(n[2])||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function E(e,t,n,i){var a=$.getElementsByTagName("head")[0];if(a){var r="string"==typeof n?n:"screen";if(i&&(k=null,L=null),!k||L!=r){var s=g("style");s.setAttribute("type","text/css"),s.setAttribute("media",r),k=a.appendChild(s),K.ie&&typeof $.styleSheets!==I&&$.styleSheets.length>0&&(k=$.styleSheets[$.styleSheets.length-1]),L=r}k&&(typeof k.addRule!==I?k.addRule(e,t):typeof $.createTextNode!==I&&k.appendChild($.createTextNode(e+" {"+t+"}")))}}function T(e,t){if(J){var n=t?"visible":"hidden",i=m(e);z&&i?i.style.visibility=n:"string"==typeof e&&E("#"+e,"visibility:"+n)}}function A(e){var t=/[\\\"<>\.;]/,n=null!==t.exec(e);return n&&typeof encodeURIComponent!==I?encodeURIComponent(e):e}{var S,C,N,x,k,L,I="undefined",B="object",F="Shockwave Flash",O="ShockwaveFlash.ShockwaveFlash",V="application/x-shockwave-flash",M="SWFObjectExprInst",j="onreadystatechange",U=window,$=document,R=navigator,_=!1,D=[],X=[],W=[],H=[],z=!1,G=!1,J=!0,Z=!1,K=function(){var e=typeof $.getElementById!==I&&typeof $.getElementsByTagName!==I&&typeof $.createElement!==I,t=R.userAgent.toLowerCase(),n=R.platform.toLowerCase(),i=/win/.test(n?n:t),a=/mac/.test(n?n:t),r=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,s="Microsoft Internet Explorer"===R.appName,o=[0,0,0],u=null;if(typeof R.plugins!==I&&typeof R.plugins[F]===B)u=R.plugins[F].description,u&&typeof R.mimeTypes!==I&&R.mimeTypes[V]&&R.mimeTypes[V].enabledPlugin&&(_=!0,s=!1,u=u.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),o[0]=w(u.replace(/^(.*)\..*$/,"$1")),o[1]=w(u.replace(/^.*\.(.*)\s.*$/,"$1")),o[2]=/[a-zA-Z]/.test(u)?w(u.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0);else if(typeof U.ActiveXObject!==I)try{var l=new U.ActiveXObject(O);l&&(u=l.GetVariable("$version"),u&&(s=!0,u=u.split(" ")[1].split(","),o=[w(u[0]),w(u[1]),w(u[2])]))}catch(d){}else try{var l=new U.ActiveXObject(O);l&&(u=l.GetVariable("$version"),u&&(u=u.split(" ")[1].split(","),o=[w(u[0]),w(u[1]),w(u[2])]))}catch(d){}return{w3:e,pv:o,wk:r,ie:s,win:i,mac:a}}();!function(){K.w3&&((typeof $.readyState!==I&&("complete"===$.readyState||"interactive"===$.readyState)||typeof $.readyState===I&&($.getElementsByTagName("body")[0]||$.body))&&e(),z||(typeof $.addEventListener!==I&&$.addEventListener("DOMContentLoaded",e,!1),K.ie&&($.attachEvent(j,function t(){"complete"===$.readyState&&($.detachEvent(j,t),e())}),U==top&&!function n(){if(!z){try{$.documentElement.doScroll("left")}catch(t){return void setTimeout(n,0)}e()}}()),K.wk&&!function i(){return z?void 0:/loaded|complete/.test($.readyState)?void e():void setTimeout(i,0)}()))}()}D[0]=function(){_?a():r()};!function(){K.ie&&window.attachEvent("onunload",function(){for(var e=H.length,n=0;e>n;n++)H[n][0].detachEvent(H[n][1],H[n][2]);for(var i=W.length,a=0;i>a;a++)v(W[a]);for(var r in K)K[r]=null;K=null;for(var s in t)t[s]=null;t=null})}();return{registerObject:function(e,t,n,i){if(K.w3&&e&&t){var a={};a.id=e,a.swfVersion=t,a.expressInstall=n,a.callbackFn=i,X[X.length]=a,T(e,!1)}else i&&i({success:!1,id:e})},getObjectById:function(e){return K.w3?s(e):void 0},embedSWF:function(e,t,i,a,r,s,l,d,c,p){var v=h(t),y={success:!1,id:v};K.w3&&!(K.wk&&K.wk<312)&&e&&t&&i&&a&&r?(T(v,!1),n(function(){i+="",a+="";var n={};if(c&&typeof c===B)for(var h in c)n[h]=c[h];n.data=e,n.width=i,n.height=a;var m={};if(d&&typeof d===B)for(var g in d)m[g]=d[g];if(l&&typeof l===B)for(var w in l)if(l.hasOwnProperty(w)){var b=Z?encodeURIComponent(w):w,E=Z?encodeURIComponent(l[w]):l[w];typeof m.flashvars!==I?m.flashvars+="&"+b+"="+E:m.flashvars=b+"="+E}if(P(r)){var A=f(n,m,t);n.id==v&&T(v,!0),y.success=!0,y.ref=A,y.id=A.id}else{if(s&&o())return n.data=s,void u(n,m,t,p);T(v,!0)}p&&p(y)})):p&&p(y)},switchOffAutoHideShow:function(){J=!1},enableUriEncoding:function(e){Z=typeof e===I?!0:e},ua:K,getFlashPlayerVersion:function(){return{major:K.pv[0],minor:K.pv[1],release:K.pv[2]}},hasFlashPlayerVersion:P,createSWF:function(e,t,n){return K.w3?f(e,t,n):void 0},showExpressInstall:function(e,t,n,i){K.w3&&o()&&u(e,t,n,i)},removeSWF:function(e){K.w3&&v(e)},createCSS:function(e,t,n,i){K.w3&&E(e,t,n,i)},addDomLoadEvent:n,addLoadEvent:i,getQueryParamValue:function(e){var t=$.location.search||$.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),!e)return A(t);for(var n=t.split("&"),i=0;i<n.length;i++)if(n[i].substring(0,n[i].indexOf("="))==e)return A(n[i].substring(n[i].indexOf("=")+1))}return""},expressInstallCallback:function(){if(G){var e=m(M);e&&S&&(e.parentNode.replaceChild(S,e),C&&(T(C,!0),K.ie&&(S.style.display="block")),N&&N(x)),G=!1}},version:"2.3"}}();return e=t}(),s=function(t){var n=l,i=a,r=n.extend({initializer:function(){var e=this;e.audio=new Audio,e.audio.preload=!0,e._addEvent(),e.status=i},_addEvent:function(){var t=this;t.audio.addEventListener("loadstart",function(n){e.log("Xplayer open"),t.fire("open")}),t.audio.addEventListener("timeupdate",function(e){t.status.currentTime=1e3*this.currentTime,t.status.duration=1e3*this.duration,t.fire(e.type,t.status)}),t.audio.addEventListener("ended",function(e){t.status.isPlaying=!1,t.status.isPaused=!1,t.fire(e.type)}),t.audio.addEventListener("progress",function(e){if(null!=t.audio.buffered&&t.audio.buffered.length){var n=t.audio.buffered.end(t.audio.buffered.length-1);t.fire(e.type,{progress:1e3*n,duration:1e3*t.audio.duration})}}),t.audio.addEventListener("error",function(e){t.fire(e.type)})},load:function(e){var t=this;t.set("src",e),t.audio.src=e,t.audio.volume=t.get("volume")},play:function(){var t=this;e.log(t.status.isPlaying),t.status.isPlaying||(t.status.isPlaying=!0,t.status.isPaused=!1,t.audio.play())},pause:function(){var e=this;e.status.isPaused||(e.status.isPlaying=!1,e.status.isPaused=!0,e.status.pausePosition=e.audio.currentTime,e.audio.pause())},stop:function(){var e=this;e.status.isPlaying=!1,e.status.isPaused=!1,e.status.pausePosition=0;try{e.audio.currentTime=0}catch(t){}e.audio.pause()},setPosition:function(e){var t=this;t.audio.readyState>0&&(t.status.currentTime=e/1e3,t.audio.currentTime=t.status.currentTime,t.status.pausePosition=e),t.status.isPlaying||t.play()},setVolume:function(e){var t=this;t.status.volume=e,t.set("volume",e)}},{ATTRS:{volume:{value:.5,setter:function(e){return this.audio.volume=e,e},validator:function(t){return 1>=t&&t>=0&&e.isNumber(t)?!0:!1}},src:{}}});return t=r}(),o=function(t){"use strict";function n(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");e||(e=Math.floor(Math.random()*t.length));for(var n="",i=0;e>i;i++)n+=t[Math.floor(Math.random()*t.length)];return n}var i=l,s=r,o=a,u=window,d="//g.alicdn.com/kg/xplayer/3.0.0/xplayer.swf";-1!==window.location.href.indexOf("ks-debug")&&(d="../flash/xplayer.swf?v="+e.now());var c=i.extend({initializer:function(){var t=this,i=n(10),a="Xplayer_"+i,r="XP_"+a,l=document.createElement("DIV"),c=document.createElement("DIV");c.id=r+"_swf",l.appendChild(c),l.id=r,l.style.position="absolute",l.style.width="1px",l.style.height="1px",l.style.left="-1000px",l.style.top="-1000px",document.body.appendChild(l);t.status=o,t["interface"]=u[a]={open:function(){t.fire("open")},timeupdate:function(e){t.status.currentTime=e.currentTime,t.status.duration=e.duration,t.fire("timeupdate",e)},ended:function(e){t.status.isPlaying=!1,t.status.isPaused=!1,t.fire("ended",e)},progress:function(e){t.fire("progress",e)},error:function(){e.log("error"),t.fire("error")}},t.player=null;var f=document.getElementById(r+"_swf");s.embedSWF(d,f,1,1,9,"",{xplayerinterface:a},{allowScriptAccess:"always",wmode:"window"},{id:"J_xiamiPlayerSwf_"+i},function(e){t.player=e.ref})},load:function(e){var t=this;t.set("src",e),t.player.jsSrc(e)},play:function(){var t=this;e.log(t.status.isPlaying,"","是否正在播放"),t.status.isPlaying||(t.status.isPlaying=!0,t.status.isPaused=!1,t.player.jsPlay())},pause:function(){var e=this;e.status.isPaused||(e.status.isPlaying=!1,e.status.isPaused=!0,e.player.jsPause())},stop:function(){var e=this;e.status.isPlaying=!1,e.status.isPaused=!1,e.status.pausePosition=0,e.player.jsStop()},setPosition:function(e){var t=this;t.status.pausePosition=e,t.player.jsPosition(Number(e)),t.status.isPlaying||t.play()},setVolume:function(e){var t=this;t.status.volume=e,t.player.setVolume(Number(e))}},{ATTR:{volume:{value:1,setter:function(e){return this.audio.volume=e,e},validator:function(t){return 1>=t&&t>=0&&e.isNumber(t)?!0:!1}},src:{}}});return t=c}(),u=function(t){"use strict";function n(t){var n=this;n.config=e.mix({autoplay:!1,forceFlash:!1,forceAudio:!1},t,!0),n._init()}var i="",a=s,r=o;return n.prototype={_init:function(){var e=this;if(e.track=null,e.player=null,e.config.forceAudio&&!e.config.forceFlash&&(e.player=new a),e.config.forceFlash&&!e.config.forceAudio&&(e.player=new r),null===e.player){var t=e.supportAudio();e.player=t?new r:new a}return e.status=e.player.status,e},load:function(e){var t=this;if(!e.url||e.url==i)throw new Error("Can't find a URL parameter");return t.stop(),t.track=e,t.player.load(t.track.url),t.config.autoplay&&t.play(),t},on:function(e,t){var n=this;return n.player.on(e,t),n},play:function(t){var n=this;return(isNaN(t)||e.isUndefined(t))&&(t=0),n.player.play(t),n},stop:function(){var e=this;return e.player.stop(),e},pause:function(){var e=this;return e.player.pause(),e},setPosition:function(t){var n=this;return e.isUndefined(t)?n:(n.player.setPosition(t),n)},getTrack:function(){var e=this;return e.track},setVolume:function(e){var t=this;t.player.setVolume(e)},supportAudio:function(){try{var t=document.createElement("audio");return!(!t.canPlayType||!t.canPlayType("audio/mpeg").replace(/no/,""))}catch(n){e.log(n)}return!1}},t=n}(),i.exports=u});