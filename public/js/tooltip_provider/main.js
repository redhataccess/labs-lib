/*global labs_define, window*/
labs_define('tooltip_provider', ['jquery', 'lib/scope/main', 'lib/tooltip_provider/ui-bootstrap-tpls-0.11.0-customized'],
    function (jq, scope_module, ui_bootstrap) {
        "use strict";

        var priv = {},
            pub = {};

        pub.manual_show_popover = function (id) {
            setTimeout(function () {
                jq('[id="' + id + '"]').trigger('show');
            }, 0);
        };

        pub.manual_hide_popover = function (id) {
            setTimeout(function () {
                var isHovered = jq(".popover:hover").length > 0;
                if (!isHovered) {
                    jq('[id="' + id + '"]').trigger('hide');
                }
            }, 0);
        };

        pub.hide_popover_div = function () {
            var objArr = jq(".popover");
            for (var i = 0; i < objArr.length; i++) {
                objArr[i].style.display = "none";
            }
        }

        return pub;
    });