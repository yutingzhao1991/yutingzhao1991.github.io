// VideoPlayer is a Compnent witch want to handler video with html5
// Author Yu Tingzhao
// Date 2013 3 9
// Version 1.0.0
// Site yutingzhao.com
;(function(window) {

var VideoPlayer = function(options) {
    this.options = options || {}
    options.width = options.width || '100'
    options.height = options.height || '100'
    this._playGround = this._createPlayGround()
    this._videoLoader = this._createVideoLoader()

    this._playGround.setSize({
        width: options.width,
        height: options.height
    })

    var _this = this

    this._videoLoader.on('timeupdate', function(e) {
        _this._playGround.draw(e.video)
    })
}

// CanvasGround is a Object witch has a canvas
// video should be play on it
VideoPlayer._CanvasGround = function() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.backCanvas = document.createElement('canvas')
    this.back = this.backCanvas.getContext('2d')
}

VideoPlayer._CanvasGround.prototype.setSize = function(data) {
    this.canvas.width = this.width = data.width
    this.canvas.height = this.height = data.height
    this.backCanvas.width = this.width = data.width
    this.backCanvas.height = this.height = data.height
}

VideoPlayer._CanvasGround.prototype.draw = function(content) {
    if (this.filterFactory) {
        this.context.putImageData(this.filterFactory(content), 0, 0)
    } else{
        this.context.drawImage(content, 0, 0, this.width, this.height)
    }
}

VideoPlayer._CanvasGround.prototype.setFilter = function(options) {
    if (!options || options.type == 'normal') {
        this.filterFactory = null
    }

    switch(options.type) {
        case 'blackwhite' :
            this.filterFactory = function(content) {
                this.back.drawImage(content,0,0,this.width,this.height)
                // Grab the pixel data from the backing canvas
                var idata = this.back.getImageData(0,0,this.width,this.height)
                var data = idata.data
                // Loop through the pixels, turning them grayscale
                for(var i = 0; i < data.length; i+=4) {
                    var r = data[i]
                    var g = data[i+1]
                    var b = data[i+2]
                    var brightness = (3*r+4*g+b)>>>3
                    data[i] = brightness
                    data[i+1] = brightness
                    data[i+2] = brightness
                }
                idata.data = data
                // Draw the pixels onto the visible canvas
                return idata
            }
            break
        default :
            this.filterFactory = function(content) {
                this.back.drawImage(content,0,0,this.width,this.height)
                // Grab the pixel data from the backing canvas
                var idata = this.back.getImageData(0,0,this.width,this.height)
                // Draw the pixels onto the visible canvas
                return idata
            }
    }
}

VideoPlayer._CanvasGround.prototype.getGround = function() {
    return this.canvas
}

VideoPlayer._CanvasGround.prototype.fullScreen = function() {
    if (this.getGround().webkitRequestFullScreen) {
        this.getGround().webkitRequestFullScreen()
    }
}

VideoPlayer.prototype._createPlayGround = function() {
    var ground = new VideoPlayer._CanvasGround()
    return ground
}

VideoPlayer.prototype.getPlayGround = function() {
    return this._playGround
}

// VideoLoader is a video Element what for load video
VideoPlayer._VideoLoader = function() {
    var videoElement = document.createElement('video')
    videoElement.controls = false
    this.video = videoElement
}

VideoPlayer._VideoLoader.prototype.load = function(url) {
    this.video.src = url
}

VideoPlayer._VideoLoader.prototype.play = function() {
    this.video.play()
}

VideoPlayer._VideoLoader.prototype.pause = function() {
    this.video.pause()
}

// add video custom events
// @param {String} event type
// @param {function} event handler
// @return {Params}
//  e {event}
//  type {String}
//  video {video Element}
VideoPlayer._VideoLoader.prototype.on = function(type, handler) {
    var _this = this
    switch(type) {
        case 'play' :
            this.video.addEventListener('play', function(e) {
                handler({
                    e: e,
                    type: 'play',
                    video: _this
                })
            })
            break
        case 'timeupdate' :
            this.video.addEventListener('timeupdate', function(e) {
                handler({
                    e: e,
                    type: 'timeupdate',
                    video: _this.video
                })
            })
    }
}

// VideoPlayer private functions

VideoPlayer.prototype._createVideoLoader = function() {
    var loader = new VideoPlayer._VideoLoader()
    return loader
}


// VideoPlayer public apis

// append player to a container
// @param {String} container Element or id
VideoPlayer.prototype.appendTo = function(container) {
    if (!container) {
        return
    }
    if (typeof container == 'string') {
        container = document.getElementById(container)
    }
    if (container) {
        container.appendChild(this.getPlayGround().getGround())
    } else {
        return
    }
}

// load a source
// @param {Params}
//  src {String} source url
VideoPlayer.prototype.load = function(data) {
    this._videoLoader.load(data.src)
}
VideoPlayer.prototype.play = function() {
    this._videoLoader.play()
}
VideoPlayer.prototype.pause = function() {
    this._videoLoader.pause()
}
VideoPlayer.prototype.fullScreen = function() {
    this._playGround.fullScreen()
}
VideoPlayer.prototype.setFilter = function(options) {
    this._playGround.setFilter(options)
}
//bind to top window
window.VideoPlayer = window.VideoPlayer || VideoPlayer

})(window);






