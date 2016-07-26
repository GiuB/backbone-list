_.mixin({

    // Load template from URL
    templateFromUrl: function (url, data, settings) {
        var templateHtml = "";
        this.cache = this.cache || {};

        if (this.cache[url]) {
            templateHtml = this.cache[url];
        } else {
            $.ajax({
                url: url,
                method: "GET",
                async: false,
                success: function(data) {
                    templateHtml = data;
                }
            });

            this.cache[url] = templateHtml;
        }

        return _.template(templateHtml, data, settings);
    },

    // Capitalize first letter
    capitalize : function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }

});