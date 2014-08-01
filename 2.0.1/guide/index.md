## 综述

Xplayer是一款音乐播放器, 支持 audio flash 播放.

* 版本：2.0.0
* 作者：宝码
* demo：[http://kg.kissyui.com/xplayer/2.0.0/demo/index.html](http://kg.kissyui.com/xplayer/2.0.0/demo/index.html)
* mini demo[http://kg.kissyui.com/xplayer/2.0.0/demo/mini.html](http://kg.kissyui.com/xplayer/2.0.0/demo/mini.html)

## 初始化组件

    S.use('kg/xplayer/2.0.0/index', function (S, Xplayer) {
        var xplayer = new Xplayer();

        xplayer.load({
            'url' : 'http://example.com/kissy.mp3'
        })

        xplayer.play();
    })

## API说明

[https://rawgit.com/noyobo/xplayer/master/2.0.0/doc/index.html](https://rawgit.com/noyobo/xplayer/master/2.0.0/doc/index.html)

> mini 的 API一致