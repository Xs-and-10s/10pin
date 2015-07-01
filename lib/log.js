var $ = require('clor')

log['help'] = sampleClorCombinations

module.exports = log

function log (value, clor_instance) {

    _object_(value)?
        _log_object_(value) :
        _log_string_(clor_instance)

}


// -----------------------------------------------------------------------------

function _object_ (value) {
    var type = typeof value;
    return !!value &&
             (type == 'object' ||
              type == 'function')
}

function _log_string_ (clor) {
    console.log('%s', clor)
}

function _log_object_ (o) {
    console.dir(o);
}



function sampleClorCombinations (specified) {
    var colors;
    var styles;
    var bgColors;
    var i;
    var j;
    var k;

    colors = specified?
    [specified.color] :
    ['white','black','red','green',
     'yellow','blue','magenta',
     'cyan', 'gray']

    styles = specified?
    [specified.style] :
    ['reset','bold','dim','italic',
     'underline','inverse','hidden',
     'strikethrough','line','space',
         'tab']

    bgColors = specified?
    [specified.bgColor] :
    ['bgWhite','bgBlack','bgRed',
     'bgGreen','bgYellow','bgBlue',
     'bgMagenta','bgCyan']

    for (i = 0;
         i < colors.length;
         i++) {

        for (j = 0;
             j < styles.length;
             j++) {

            for (k = 0;
                 k < bgColors.length;
                 k++) {

                printSample(
                    colors[i],
                    styles[j],
                    bgColors[k]);
            }
        }
    }

    function printSample ($c,$s,$b) {
        _log_string_($[$c][$s][$b](''+
                     $c+':'+$s+'/'+$b))
    }

}
