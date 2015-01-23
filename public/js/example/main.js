/*global labs_define, window*/
labs_define('example', [], function () {
    "use strict";

    var priv = {},
        pub  = {};

    pub.sayHello = function () {
        console.log('Nín hǎo from example/main.js');
    };

    pub.getMagicNumber = function () {
        var randomNum = priv.getRand(2, 8);
        return priv.pow(randomNum, 2);
    };

    priv.getRand = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    priv.pow = function (base, exponent) {
        return window.Math.pow(base, exponent);
    };

    return pub;
});
