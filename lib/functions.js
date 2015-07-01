module.exports = {
    isFunction : isFunction,
      isObject : isObject,
         slice : slice
}
// -----------------------------------------------------------------------------


function slice (obrray, beginAt, returnAt) {
    "use strict";
    var output;
    var i, length;

    output = []
    i = beginAt>>>0
    length = returnAt>>>0 || obrray.length>>>0

    for (; i<length;
           i++ ) { output[i] = obrray[i] }

    return output
}

function isFunction(value) {
    "use strict";
    return isObject(value) &&
           Object.prototype.toString.call(value) == '[object Function]'
}

function isObject(value) {
    "use strict";
    var type = typeof value;
    return !!value &&
             (type == 'object' ||
              type == 'function')
}
