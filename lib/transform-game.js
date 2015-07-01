var trace = require('./tracer')

var TERMS = require('./bowling-terms')
var synthesis = require('./synthesis')

module.exports = function transform (representation) {
    trace.fn('transform')
    var interpretation;

    interpretation = synthesis.constructGame(representation.game.regular,
                                             representation.frames,
                                             representation.throws)

    return trace.
        ok(interpretation)
}
