/*global labs_define, window*/
labs_define('scroll_to', ['jquery'], function (jq) {
    "use strict";

    var priv = {},
        pub = {};

    pub.to_id = function (id) {
        setTimeout(function () {
            jq('html,body').animate({
                scrollTop: jq(id).offset().top
            }, 'fast');
        }, 100);
    };

    return pub;
});