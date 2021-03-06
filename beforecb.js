var beforefn = require("beforefn");

function beforeCallback(options, fn, beforeCbFn) {
    if (arguments.length == 2) return beforeCallback({}, options, fn);
    
    var wrappedFunction = function() {
        var args = Array.prototype.slice.call(arguments);
        var cbNum = null;
        var context = fn;
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === "function") {
                cbNum = i;
            }
        }
        
        var originalCallback = args[cbNum];
        if (cbNum !== null) {
            if (options.async) {
                args[cbNum] = function() {
                    var cbArgs = Array.prototype.slice.call(arguments);
                    
                    // Add done callback
                    var beforeCbFnCallback = function() {
                        originalCallback.apply(context, cbArgs);
                    };
                    
                    beforeCbFnCallback.args = options.allArgs ? [args] : [];
                    beforeCbFnCallback.args = beforeCbFnCallback.args.concat(cbArgs);
                    
                    beforeCbFn.apply(context, [beforeCbFnCallback]);
                }
            } else {
                if (options.allArgs) {
                    beforeCbFn = beforeCbFn.bind(context, args);
                }
                args[cbNum] = beforefn(args[cbNum], beforeCbFn);
            }
        }
        fn.apply(this, args);
    }
    
    return wrappedFunction;
}


module.exports = beforeCallback;