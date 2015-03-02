/*global labs_define, window*/
labs_define('download', ['jquery', 'lib/scope/main', 'lib/download/jquery.fileDownload'],
    function (jq, scope_module, jquery_file_download) {
        "use strict";

        var priv = {},
            pub = {};

        pub.download = function (url, content, fileName) {
            jq.fileDownload(url, {
                httpMethod: "POST",
                data: {
                    content: content,
                    file_name: fileName
                }
            });
        };

        return pub;
    });