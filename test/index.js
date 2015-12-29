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
    var func = function(number, letter, func, cb) {
        cb(); 
    };
    var wrappedFunc = beforecb(func, function () {
        called++;
    });
    wrappedFunc(1, "two", function() {}, function() {
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

test("original function is still passed arguments", function (t) {
    t.plan(2);
    var func = function(one, two, cb) { 
        t.equal(one, "a")
        t.equal(two, 2)
        cb(); 
    };
    var wrappedFunc = beforecb(func, function() {});
    wrappedFunc("a", 2, function() {
        t.end();
    });
});