/*global labs_define, window*/
labs_define('example_two', ['lib/example/main'], function (example) {
    "use strict";

    var priv = {},
        pub  = {};

    pub.sayHello = function () {
        console.log('Calling example');
        example.sayHello();
    };

    return pub;
});
