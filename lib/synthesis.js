var trace = require('./tracer')


module.exports = {
    constructGame: constructGame
}

function constructGame (game, frames, throws) {
    trace.fn('constructGame')
    var output;

    output = game.map(scaffoldFrame)
    output = output.reduce(fillFrameWithThrows, {collection: [],
                                                 counter: 0})

    return trace.
        ok(output.collection)


    function scaffoldFrame (frame, i) {
        trace.fn('scaffoldFrame: '+frame+'@'+i)
        var result, frameType, nativeThrows, modifierThrows;
        var i, length;

                result = []
             frameType = frames[i]
          nativeThrows = []

        for (i = 0, length = frame.length;
             i < length;
             i++) {

            nativeThrows.push(true)
        }

        modifierThrows = frameType === 2 ? [null,null] :
                         frameType === 1 ? [null] :
                                           [];

        result = nativeThrows.concat(modifierThrows)

        return trace.
            ok(result)
    }


    function fillFrameWithThrows (prevFrame, currFrame, frameIndex) {
        trace.fn('fillFrameWithThrows: '+currFrame+'@'+frameIndex)
        var result, startAtIndex, nativeThrows;

        startAtIndex = prevFrame.counter
        nativeThrows = currFrame.filter(function (each) {
                           return each === true
                       })

              result = currFrame.map(ontoThrows)
              result = result.concat(prevFrame.collection)
        startAtIndex = startAtIndex + nativeThrows.length

        return trace.
            ok({ collection : result,
                 counter : startAtIndex })

        function ontoThrows (current, i) {
            return throws[startAtIndex]
        }
    }
}

