var trace = require('./tracer')

module.exports = {
    countScore: countScore
}

function countScore (game) {
    trace.fn('countScore')
    var result;

    result = game.reduce(function tally (score, points) {
                 return score + points
             })

    return trace.
        ok(result)
}
