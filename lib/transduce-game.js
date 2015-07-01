var trace = require('./tracer')

var TERMS = require('./bowling-terms')
var persistence = require('./persistence')

module.exports = function transduce (interpretation) {
    trace.fn('transduce')
    var simplification;

    simplification = persistence.countScore(interpretation)

    return trace.
        ok(simplification)
}
