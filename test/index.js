"use strict"

var test = require("tape");
var beforecb = require("../");

test("before executes before", function(t) {
    var called = 0;
    var func = function(cb) {
        cb(); 
    };
    var wrappedFunc = beforecb(func, function () {
        called++;
    });
    wrappedFunc(function() {
        t.equal(called, 1);
        t.end();
    });
});

test("works when multiple arguments are passed", function(t) {
    var called = 0;
    var func = function(letter, number, func, cb) {
        cb(); 
    };
    var wrappedFunc = beforecb(func, function () {
        called++;
    });
    wrappedFunc("a", 1, function() {}, function() {
        t.equal(called, 1);
        t.end();
    });
});

test("works in async mode", function(t) {
    var called = 0;
    var func = function(cb) {
        cb(); 
    };
    var wrappedFunc = beforecb({async: true}, func, function (done) {
        called++;
        return done();
    });
    wrappedFunc(function() {
        t.equal(called, 1);
        t.end();
    });
});

test("before is passed args that were passed to callback", function (t) {
    var func = function(cb) { 
        cb("a", 1); 
    };
    var wrappedFunc = beforecb(func, function() {
        t.equal(arguments[0], "a");
        t.equal(arguments[1], 1);
    });
    wrappedFunc(function() {
        t.equal(arguments[0], "a");
        t.equal(arguments[1], 1);
        t.end();
    });
});

test("when in async mode the callback to beforeCbFunction is given the property args with all arguments inside", function (t) {
    var func = function(cb) { 
        cb("a", 1); 
    };
    var wrappedFunc = beforecb({async: true}, func, function(callback) {
        var args = callback.args;
        t.equal(args[0], "a");
        t.equal(args[1], 1);
        callback();
    });
    wrappedFunc(function() {
        t.equal(arguments[0], "a");
        t.equal(arguments[1], 1);
        t.end();
    });
});

test("before is passed args that were passed to original function if allArgs is true", function (t) {
    var func = function(one, two, cb) { 
        t.equal(one, "b");
        t.equal(two, 2);
        cb("a", 1); 
    };
    var wrappedFunc = beforecb({allArgs: true}, func, function() {
        t.equal(arguments[0][0], "b");
        t.equal(arguments[0][1], 2);
        t.equal(arguments[1], "a");
        t.equal(arguments[2], 1);
    });
    wrappedFunc("b", 2, function() {
        t.equal(arguments[0], "a");
        t.equal(arguments[1], 1);
        t.end();
    });
});

test("when using async and allArgs both work as they should", function (t) {
    var func = function(one, two, cb) { 
        t.equal(one, "b");
        t.equal(two, 2);
        cb("a", 1); 
    };
    var wrappedFunc = beforecb({async: true, allArgs: true}, func, function(callback) {
        var args = callback.args;
        t.equal(args[0][0], "b");
        t.equal(args[0][1], 2);
        t.equal(args[1], "a");
        t.equal(args[2], 1);
        callback();
    });
    wrappedFunc("b", 2, function() {
        t.equal(arguments[0], "a");
        t.equal(arguments[1], 1);
        t.end();
    });
});

test("original function is still passed arguments", function (t) {
    t.plan(2);
    var func = function(one, two, cb) { 
        t.equal(one, "b")
        t.equal(two, 2)
        cb(); 
    };
    var wrappedFunc = beforecb(func, function() {});
    wrappedFunc("b", 2, function() {
        t.end();
    });
});