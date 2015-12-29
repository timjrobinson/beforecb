# beforecb
Wrap a function to call a function before its callback is called

# Usages

You can do the following without having to insert code into the function or wrap every call

- Time async functions 
- Output when your program is entering / exiting functions 

# Examples

```
var beforefn = require("beforefn"); # https://github.com/timoxley/beforefn
var beforecb = require("beforecb"); 

function dbRequest(request, callback) {
    request(function() {
        callback();
    }); 
}

// Time every call to this function without inserting any new code into the function or every call.
beforefn(dbRequest, function() {
    var startTime;
    startTime = Date.now();
    beforecb(dbRequest, function() {
        console.log("Total time: " + (Date.now() - startTime));
    });
}
```
