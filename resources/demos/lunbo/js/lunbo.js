//
//<div id="id">
//  <img src="xxx">
//  <img src="xx2">
//</div>
//

//
// options
//
// height xxpx
// width xxpx
// delay x.x {s}
// duration xxxx {ms}
//


function lunbo(id, options){
    var container = $('#' + id)
    var units = container.children()
    var currentSit = 0
    container.css({
        height : options.height,
        width : options.width,
        position : 'relative'
    })
    $.each(units, function(i, data) {
        $(data).css({
            height : options.height,
            width : options.width,
            position : 'absolute',
            top: '0',
            left: '0',
            opacity: i == currentSit ? '1' : '0',
            '-webkit-transition': 'opacity ' + options.duration + 's ease-out 0s'
        })
    })
    setInterval(function() {
        if (currentSit == units.length) {
            currentSit = 0
        }
        $.each(units, function(i, data) {
            if( i == currentSit ){
                $(data).css({
                    opacity: '1'
                })
            } else {
                $(data).css({
                    opacity: '0'
                })
            }
        })
        currentSit ++
    }, options.delay)
}