var trace = require('./tracer')
var slice = require('./functions').slice
var isFunction = require('./functions').isFunction


module.exports = {
    extractFrameTypesByPattern: extractFrameTypesByPattern,
    extractThrowsByMapping: extractThrowsByMapping,
    partitionFramesByMode: partitionFramesByMode,
    splitIntoFramesByDelimiter: splitIntoFramesByDelimiter
}
// -----------------------------------------------------------------------------

function splitIntoFramesByDelimiter (DELIMITER, input) {
    trace.fn('splitIntoFramesByDelimiter')
    var frames;

    frames = input.split(DELIMITER)

    return trace.
        ok(frames)
}

function partitionFramesByMode (MODES, frames) {
    trace.fn('partitionFramesByMode')
    var output;
    var START_REGULAR, END_REGULAR;
    var START_SPECIAL, END_SPECIAL;

    output = []
    START_REGULAR = MODES.regular.begin
      END_REGULAR = MODES.regular.begin + MODES.regular.length
    START_SPECIAL = MODES.special.begin
      END_SPECIAL = MODES.special.begin + MODES.special.length

    output.push(frames.slice( START_REGULAR, END_REGULAR ))
    output.push(frames.slice( START_SPECIAL, END_SPECIAL ))

    return trace.
        ok(output)
}

function extractFrameTypesByPattern (TYPE, PATTERN, data) {
    trace.fn('extractFrameTypesByPattern')
    var representation;
    var OPEN, SPARE, STRIKE;

      OPEN = PATTERN.open
     SPARE = PATTERN.spare
    STRIKE = PATTERN.strike

    representation = data.

    map(function matchPattern (input, i) {
        trace.fn('matchPattern:'+input+'@'+i)
        var strike, spare, open;

        strike = input.match(STRIKE)
         spare = input.match(SPARE)
          open = input.match(OPEN)

        return trace.
            ok(strike? 'strike':
                spare? 'spare' :
                 open? 'open'  :
                   new Error('no pattern matched '
                            +'frame at index ' +i
                            +': '+input))
    }).
    map(function matchFrameType (input, i) {
        trace.fn('matchFrameType:'+input+'@'+i)
        if (input instanceof Error) { return input; }

        return trace.
            ok(TYPE[input].modifier)
    })

    return trace.
        ok(representation)
}

function extractThrowsByMapping (MAPPING, regular, special) {
    trace.fn('extractThrowsByMapping')
    var representation;

    representation = []
    regular.map(parseOneFrame)
    special.map(parseOneFrame)

    return trace.
        ok(representation)

    function parseOneFrame (frame, i) {
        trace.fn('parseOneFrame:'+frame+'@'+i)
        var value;
        var i, length;

        i = 0
        length = frame.length
        value = []
        for (; i < length; i++) {
            value[i] = MAPPING[frame[i]]? MAPPING[frame[i]](value[i-1])
                                        : parseInt( frame[i], 10 )
            representation.push(value[i])
        }

        return trace.
            ok(frame)
    }
}
