"use strict";

var $ = require('clor')
var log = require('./log')

var stack = []

module.exports = {
    enter: log_context_entrance,
    fail: log_failure,
    fn: log_function,
    help: log.help,
    leave: log_context_exit,
    log: log_data,
    ok: log_success,
    special: log_special_data
}
// -----------------------------------------------------------------------------

function log_data (data) {
    var indent = stack.join()

    log(data, $.
        bold.black.bgYellow(''+
            indent+
            data))

    return data
}

function log_special_data (tag, data) {
    var end, i, len;
    if (arguments.length === 1) {
        data = tag
        tag = '*LOOK AT ME!!*'
    }
    end = ''
    for (i = 0, len = tag.length;
         i < len; i++) {
        end += '-'
    }
    log(null, $.
        white.bold.bgRed('___'+tag+'___'))
    log_data(data)
    log(null, $.
        red.bold('---'+end+'---'))
    console.log('\n')
}

function log_context_entrance (context_name) {
    var indent;

    stack.push('  ') && (indent = stack.join())

    log(null, $.
        inverse.white.bgBlue('\n'+
            context_name+
            ' '))
}

function log_context_exit (context_name, result) {
    var indent = stack.join()

    result? (log(result, $.
                 bgGreen.bold.black(result)),
             log(null, $.
                 inverse.black.bgCyan('\n'+
                    context_name+
                    ' '))) :


            (log($.
                 inverse.black.bgCyan('\n'+
                     context_name+
                     ' ')))

    stack.pop()
    return result
}

function log_function (fname, args) {
    var indent;

    indent = stack.join()
    args = args || ''

    log(fname, $.
        bold.black(''+
            indent).
        underline.bgBlue.white(''+
            fname/*+'('+args+')'*/))

    log(args, $.
        underline.bgWhite.green(args))

    stack.push('  ')
}

function log_failure (fname, reason) {
    var indent;
    stack.pop() && (indent = stack.join())

    log(reason, $.
        red.bold(''+
            indent+
            ' FAILURE in: '+fname+
            '\n'+indent+
            ' REASON: '+(reason||'???')))

    return new Error(reason)
}

function log_success (value) {
    var indent;
    stack.pop() && (indent = stack.join())

    log(value, $.
        bold(''+
            indent).
        bgBlack.green(''+
            '=>'+value))

    return value
}
