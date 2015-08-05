/*global labs_define, window*/
labs_define('validator', [], function () {
    "use strict";

    var priv = {},
        pub = {};

    pub.validate_ip = function (ip) {
        var reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (reg.test(ip)) {
            var ip1 = Number(RegExp.$1);
            var ip2 = Number(RegExp.$2);
            var ip3 = Number(RegExp.$3);
            var ip4 = Number(RegExp.$4);
            if (ip1 < 256 && ip2 < 256 && ip3 < 256 && ip4 < 256) {
                return true;
            }
        }
        return false;
    };

    pub.validate_mac = function (mac) {
        var reg = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
        if (reg.test(mac)) {
            return true;
        }
        return false;
    };

    return pub;
});