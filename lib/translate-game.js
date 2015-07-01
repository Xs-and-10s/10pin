var trace = require('./tracer')

var TERMS = require('./bowling-terms')
var analysis = require('./analysis')

module.exports = function translate (data) {
    trace.fn('translate')
    var representation, invalid;
    var DELIMITER;
    var MODE;
    var FRAME_TYPES, REGULAR_FRAME_PATTERNS;
    var THROW_MAPPING;
    var input, game, frames, throws;

                 DELIMITER = TERMS.frames.patterns.delimiter
                      MODE = TERMS.frames.modes
               FRAME_TYPES = TERMS.frames.types
    REGULAR_FRAME_PATTERNS = TERMS.frames.patterns.modes.regular.types
             THROW_MAPPING = TERMS.throws.mapping

     input = analysis.splitIntoFramesByDelimiter(DELIMITER,
                                                 data)

      game = analysis.partitionFramesByMode(MODE,
                                            input)

    frames = analysis.extractFrameTypesByPattern(FRAME_TYPES,
                                                 REGULAR_FRAME_PATTERNS,
                                                 game[0])

    throws = analysis.extractThrowsByMapping(THROW_MAPPING,
                                             game[0],
                                             game[1])

    representation = {
        frames : frames,
        game : {
            regular : game[0],
            special : game[1]
        },
        input : input,
        throws : throws
    }

    return trace.
        ok(representation)
}
