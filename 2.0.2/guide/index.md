## 综述

Xplayer是一款音乐播放器, 支持 audio flash 播放.

* 版本：2.0.2
* 作者：宝码
* demo：[/xplayer/doc/demo/index.html](/xplayer/doc/demo/index.html)
* mini demo[/xplayer/doc/demo/mini.html](/xplayer/doc/demo/mini.html)

## 初始化组件

    S.use('kg/xplayer/2.0.2/index', function (S, Xplayer) {
        var xplayer = new Xplayer({
                'autoplay': false, // 是否自动播放
                'forceFlash': false, // 强制使用Flash
                'forceAudio': false // 强制使用Audia
            });

        xplayer.load({
            'url' : 'http://example.com/kissy.mp3'
        })

        xplayer.play();
    })

## API说明

[/xplayer/doc/doc/index.html](/xplayer/doc/doc/index.html)

> mini 的 API一致