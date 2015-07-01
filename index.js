var trace = require('./lib/tracer')

var translate = require('./lib/translate-game')
var transform = require('./lib/transform-game')
var transduce = require('./lib/transduce-game')

// -------------------------------------------------------------------------
test_run_simple__3_cases()
// trace.help()
// -------------------------------------------------------------------------

function main (input) {
    "use strict";

    trace.enter('main')
    var representation, interpretation, simplification;

    trace.
    enter('::ANALYSIS')
    representation = trace.
                     leave('::ANALYSIS',
                           translate(input))

    trace.
    enter('::SYNTHESIS')
    interpretation = trace.
                     leave('::SYNTHESIS',
                           transform(representation))

    trace.
    enter('::PERSISTENCE')
    simplification = trace.
                     leave('::PERSISTENCE',
                           transduce(interpretation))

    return trace.
           leave('main',
                 simplification)
}

// -------------------------------------------------------------------------


function test_run_simple__3_cases () {
    var INPUT = {
        'all-strikes' : 'X-X-X-X-X-X-X-X-X-X-XX',
        'all-spares' : '5/-5/-5/-5/-5/-5/-5/-5/-5/-5/-5',
        'all-open' : '45-54-36-27-09-63-81-18-90-72'
    }
    var test = {
        strikes: main(INPUT['all-strikes']),
        spares: main(INPUT['all-spares']),
        open: main(INPUT['all-open'])
    }
    trace.log('Result Set: ')
    trace.log('\n\t    All Strikes:\t'+JSON.stringify(test.strikes), {colors: true, depth: null})
    trace.log('\n\t     All Spares:\t'+JSON.stringify(test.spares), {colors: true, depth: null})
    trace.log('\n(arbitrary)   Open Only:\t'+JSON.stringify(test.open), {colors: true, depth: null})
}
