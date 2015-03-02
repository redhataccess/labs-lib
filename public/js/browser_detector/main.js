/*global labs_define, window*/
labs_define('browser_detector', ['lib/scope/main'], function (scope_module) {
    "use strict";

    var priv = {},
        pub = {};

    pub.get_browser_info = function () {
        var userAgent = navigator.userAgent;
        var browser;
        var version;
        var ua = userAgent.toLowerCase();
        var browserMatch = priv.uaMatch(userAgent.toLowerCase());
        if (browserMatch.browser) {
            browser = browserMatch.browser;
            version = browserMatch.version;
        }
        var browser_info = {
            "browser": browser,
            "version": version
        };
        return browser_info;
    };

    priv.uaMatch = function (ua) {
        var rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var match = rMsie.exec(ua);
        if (match != null) {
            return {
                browser: "IE",
                version: match[2] || "0"
            };
        }
        var match = rFirefox.exec(ua);
        if (match != null) {
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }
        var match = rOpera.exec(ua);
        if (match != null) {
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }
        var match = rChrome.exec(ua);
        if (match != null) {
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }
        var match = rSafari.exec(ua);
        if (match != null) {
            return {
                browser: match[2] || "",
                version: match[1] || "0"
            };
        }
        if (match != null) {
            return {
                browser: "",
                version: "0"
            };
        }
    }

    return pub;
});