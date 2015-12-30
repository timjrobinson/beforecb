# beforecb

#### Wrap a function to call a function before its callback is called

## Usage

You can do the following without having to insert code into the function or wrap every call

- Time async functions 
- Output when your program is entering / exiting functions 

```js
var beforecb = require("beforecb");

var wrapped = beforecb(options, function original, function beforeCbFunction);
```

Arguments:

- `options` - *Optional* - An object with any of the following options:
    - async - the first argument to beforeCbFunction will be a callback and your original callback will only be called once this is called
    - allArgs - arguments to the original function are passed as an array to the first argument of beforeCbFunction
- `original` - The function you want to wrap.
- `beforeCbFunction` - A function to call just before the wrapped functions callback. 

## API Info

- beforecb returns a new function
- You can pass multiple arguments to it, the last function will be presumed to be the callback. 
- All arguments to the callback will be passed to the beforecb function.
- By default the original callback is called after beforeCbFunction has returned (If `options.async` is not set)
- When in async mode all arguments are added as the property `args` on the callback passed to the beforeCbFunction argument

## Examples

```js
var beforefn = require("beforefn"); // https://github.com/timoxley/beforefn
var beforecb = require("../"); 

function slowFunc(callback) {
    for (var i = 0; i < 10e7; i++) {}
    callback();
}

// Time calls to this function without inserting any new code into the function or wrapping calls to it
// Warning: This won't work if you call slowFunc multiple times in parallel.
var startTime;
slowFunc = beforefn(slowFunc, function() {
    startTime = Date.now();
});
slowFunc = beforecb(slowFunc, function() {
    console.log("Total time: " + (Date.now() - startTime));
});

// Call the function as usual, and see timings added
slowFunc(function() {
    console.log("done");
});
```

## See Also

* [timoxley/beforefn](http://github.com/timoxley/beforefn)
* [timoxley/afterfn](http://github.com/timoxley/afterfn)