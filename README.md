# beforecb
Wrap a function to call a function before its callback is called

# Usages

You can do the following without having to insert code into the function or wrap every call

- Time async functions 
- Output when your program is entering / exiting functions 

# Examples

```
var beforefn = require("beforefn"); // https://github.com/timoxley/beforefn
var beforecb = require("../"); 

function slowFunc(callback) {
    for (var i = 0; i < 10e7; i++) {}
    callback();
}

// Time calls to this function without inserting any new code into the function or calls to it
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
