/*global require, window, define*/
(function () {
    "use strict";

    var doGlobal = function (args) {
        // Note: Object.prototype.__defineGetter__() would be sweet here, but:
        //
        // """ This feature has been removed from the Web standards.
        // Though some browsers may still support it, it is in the process of being dropped.
        // Do not use it in old or new projects. Pages or Web apps using it may break at any time. """x
        //
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
        //
        // Note: there is NO dep injection here

        if (!window.LabsLib) {
            window.LabsLib = {};
            window.LabsLibCache = {};
        }

        if (!window.LabsLib[args[0]]) {
            window.LabsLib[args[0]] = function () {
                if (!window.LabsLibCache[args[0]]) {
                    window.LabsLibCache[args[0]] = args[2]();
                }

                // return the ref already in the map
                return window.LabsLibCache[args[0]];
            };
        }
    };

    window.labs_define = function () {
        // Try and do the AMD module definition if possible
        if (typeof define === 'function' && define.amd) {
            define.apply(this,  Array.prototype.slice.call(arguments, 1));
        }

        // Always setup a reference to this module on LabsLib
        doGlobal(arguments);
    };

    // When require is present... set up RequireJS
    if (window.require) {
        require.config({
            packages: [{
                name:     'lib',
                location: '/labs/lib/js/'
            }]
        });
    }
}());