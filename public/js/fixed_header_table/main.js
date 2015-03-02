/*global labs_define, window*/
labs_define('fixed_header_table', ['jquery', 'lib/scope/main'], function (jq, scope_module) {
    "use strict";

    var priv = {},
        pub = {};

    pub.set_fixed_header_table_all = function () {
        setTimeout(function () {
            var objArray = jq("table")
            for (var i = 0; i < objArray.length; i++) {
                if (objArray[i].id.indexOf("_cloned") == -1)
                    priv.fixed_header_table(objArray[i].id);
            }
        }, 0);
    }

    pub.set_fixed_header_table_by_id = function (id) {
        priv.fixed_header_table(id);
    }

    priv.fixed_header_table = function (table_id) {
        var params = [];
        params["parent_width"] = jq("#" + table_id).parent().width();
        params["fixed_header_type"] = jq("#" + table_id).attr("fixed_header_type");
        params["table_obj"] = jq("#" + table_id);
        params["width_td_0"] = jq("#" + table_id).children().children().children().width() * 1 + 4;
        params["height_td_0"] = jq("#" + table_id).children().children().children().height() * 1 + 4;
        params["div_width"] = jq("#" + table_id).attr("div_width");
        params["div_height"] = jq("#" + table_id).attr("div_height");
        params["table_width"] = jq("#" + table_id).width();
        params["table_height"] = jq("#" + table_id).height();
        if (params["parent_width"] != 0)
            params["div_width"] = (params["div_width"] * 1 > params["parent_width"] * 1) ? params["parent_width"] : params["div_width"];
        priv.set_layout(table_id, params);
        if (params["table_width"] > params["div_width"] || params["table_height"] > params["div_height"]) {
            priv.add_divs(table_id, params);
            priv.clone_table(table_id, params);
            priv.set_margin(table_id, params);
            priv.set_table_style(table_id, params);
            priv.attach_scroll(table_id, params);
            priv.set_cloned_div_style(table_id, params);
            priv.adjust_style_if_not_overflow(table_id, params);
            jq("#" + table_id + "_layout").css("border", "solid 1px #ccc");
            setTimeout(function () {
                priv.set_offset(table_id, params);
            }, 0);
        } else {
            jq("#" + table_id + "_layout").css("display", "none");
            jq("#" + table_id).css("width", params["table_width"]);
            jq("#" + table_id).css("height", params["table_height"]);
        }
    }

    priv.set_layout = function (table_id, params) {
        if (jq("#" + table_id + "_layout").length != 0) {
            jq("#" + table_id + "_layout").before(jq("#" + table_id));
            jq("#" + table_id + "_layout").empty();
            jq("#" + table_id + "_layout").css("width", params["div_width"]);
            jq("#" + table_id + "_layout").css("height", params["div_height"]);
        } else {
            jq("#" + table_id).after("<div id='" + table_id + "_layout' style='overflow:hidden;height:" + params["div_height"] + "px; width:" + params["div_width"] + "px;'></div>");
        }
    }

    priv.add_divs = function (table_id, params) {
        var divStr = '';
        if (params["fixed_header_type"] == "both")
            divStr += '<div id="' + table_id + '_fixed_cell"></div>';
        if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both")
            divStr += '<div id="' + table_id + '_header_row"></div>';
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both")
            divStr += '<div id="' + table_id + '_header_col"></div>';
        divStr += '<div id="' + table_id + '_data"></div>';
        jq("#" + table_id + "_layout").css("display", "");
        jq(divStr).appendTo("#" + table_id + "_layout");
    }

    priv.clone_table = function (table_id, params) {
        var oldtable = jq("#" + table_id);
        if (params["fixed_header_type"] == "both") {
            var table_fixed_cell_cloned = oldtable.clone(true);
            table_fixed_cell_cloned.attr("id", table_id + "_fixed_cell_cloned");
            jq("#" + table_id + "_fixed_cell").append(table_fixed_cell_cloned);
        }
        if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both") {
            var table_header_row_cloned = oldtable.clone(true);
            table_header_row_cloned.attr("id", table_id + "_header_row_cloned");
            jq("#" + table_id + "_header_row").append(table_header_row_cloned);
        }
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both") {
            var table_header_col_cloned = oldtable.clone(true);
            table_header_col_cloned.attr("id", table_id + "_header_col_cloned");
            jq("#" + table_id + "_header_col").append(table_header_col_cloned);
        }
        jq("#" + table_id + "_data").append(oldtable);
    }

    priv.set_margin = function (table_id, params) {
        jq("#" + table_id + "_layout table").each(function () {
            jq(this).css("margin", "0");
        });
    }

    priv.set_table_style = function (table_id, params) {
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both") {
            jq("#" + table_id + "_header_col table").css("width", params["table_width"]);
            jq("#" + table_id + "_header_col table").css("height", params["table_height"]);
        }
        jq("#" + table_id + "_data table").css("width", params["table_width"]);
        jq("#" + table_id + "_data table").css("height", params["table_height"]);
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both") {
            jq("#" + table_id + "_fixed_cell table").css("width", params["table_width"]);
            jq("#" + table_id + "_fixed_cell table").css("height", params["table_height"]);
        }
        jq("#" + table_id + "_layout table").css("width", params["table_width"]);
        jq("#" + table_id + "_layout table").css("height", params["table_height"]);
    }

    priv.attach_scroll = function (table_id, params) {
        jq("#" + table_id + "_data").scroll(function () {
            if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_row").scrollLeft(jq("#" + table_id + "_data").scrollLeft());
            if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_col").scrollTop(jq("#" + table_id + "_data").scrollTop());
        });
    }

    priv.set_cloned_div_style = function (table_id, params) {
        if (params["fixed_header_type"] == "both") {
            jq("#" + table_id + "_fixed_cell").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "width": params["width_td_0"] + 2,
                "height": params["height_td_0"] + 1,
                "background-color": "#f7f7f7"
            });
            jq("#" + table_id + "_fixed_cell_cloned").addClass("header-style");
        }
        if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both") {
            jq("#" + table_id + "_header_row").css({
                "overflow": "hidden",
                "width": params["div_width"] - 17,
                "height": params["height_td_0"],
                "position": "relative",
                "z-index": "45",
                "background-color": "#f7f7f7"
            });
            jq("#" + table_id + "_header_row_cloned").addClass("header-style");
        }
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both") {
            jq("#" + table_id + "_header_col").css({
                "overflow": "hidden",
                "width": params["width_td_0"],
                "height": params["div_height"] - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#f7f7f7"
            });
            jq("#" + table_id + "_header_col_cloned").addClass("header-style");
        }
        jq("#" + table_id + "_data").css({
            "overflow": "scroll",
            "width": params["div_width"],
            "height": params["div_height"],
            "position": "relative",
            "z-index": "35"
        });
    }

    priv.adjust_style_if_not_overflow = function (table_id, params) {
        if (params["table_width"] <= params["div_width"]) {
            jq("#" + table_id + "_data").css("overflow-x", "hidden");
            jq("#" + table_id + "_data").css("overflow-y", "scroll");
            if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_row").css("width", params["table_width"]);
            if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_col").css("height", params["div_height"]);
            jq("#" + table_id + "_data").css("width", params["table_width"] + 17);
            jq("#" + table_id + "_layout").css("width", params["table_width"] + 17);
        }
        if (params["table_height"] <= params["div_height"]) {
            jq("#" + table_id + "_data").css("overflow-y", "hidden");
            jq("#" + table_id + "_data").css("overflow-x", "scroll");
            if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_row").css("width", params["div_width"]);
            if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both")
                jq("#" + table_id + "_header_col").css("height", params["table_height"]);
            jq("#" + table_id + "_data").css("height", params["table_height"] + 17);
            jq("#" + table_id + "_layout").css("height", params["table_height"] + 17);
        }
    }

    priv.set_offset = function (table_id, params) {
        if (params["fixed_header_type"] == "both")
            jq("#" + table_id + "_fixed_cell").offset(jq("#" + table_id + "_layout").offset());
        if (params["fixed_header_type"] == "row" || params["fixed_header_type"] == "both")
            jq("#" + table_id + "_header_row").offset(jq("#" + table_id + "_layout").offset());
        if (params["fixed_header_type"] == "col" || params["fixed_header_type"] == "both")
            jq("#" + table_id + "_header_col").offset(jq("#" + table_id + "_layout").offset());
        jq("#" + table_id + "_data").offset(jq("#" + table_id + "_layout").offset());
    }

    return pub;
});