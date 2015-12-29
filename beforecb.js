var beforefn = require("beforefn");

function beforeCallback(fn, beforeCbFn) {
    var wrappedFunction = function() {
        var args = Array.prototype.slice.call(arguments);
        var cbNum = null;
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === "function") {
                cbNum = i;
            }
        }
        
        if (cbNum !== null) {
            args[cbNum] = beforefn(args[cbNum], beforeCbFn);
        }
        fn.apply(this, args);
    }
    
    return wrappedFunction;
}


module.exports = beforeCallback;