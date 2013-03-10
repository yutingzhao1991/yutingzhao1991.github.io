//
// this is a demo page js
//
// Author Yu Tingzhao
//
// Version 1.0.0
//

window.onload = function() {
    var player = new VideoPlayer({
        height: '240',
        width: '320'
    })

    player.appendTo('video-container')

    T.on('controls-load', 'click', function(){
        player.load({
            src: './movie.ogg'
        })
    })

    T.on('controls-play', 'click', function(){
        player.play()
    })

    T.on('controls-pause', 'click', function(){
        player.pause()
    })

    T.on('controls-full', 'click', function(){
        player.fullScreen()
    })

    T.on('controls-filter', 'change', function(){
        player.setFilter({
            type: this.value
        })
    })
}