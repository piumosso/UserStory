(function(){
    var _ = _ || require('underscore');


    var Logger = function(options){
        this.options = {
            on: [],
            off: [],
            do: function(message, section){
                console.log(section + ': ' + message);
            }
        };

        if (options) {
            this.configure(options);
        }
    };


    Logger.prototype.configure = function(options){
        this.options = _.extend({}, this.options, options);
    };


    Logger.prototype.sectionToSubSections = function(section){
        var parts = section.split('.'),
            prefix = '';

        for (var i = 0; i < parts.length; i++) {
            prefix = parts[i] = (prefix ? prefix + '.' : '') + parts[i];
        }

        return parts;
    };


    Logger.prototype.isAllowed = function(section){
        var subsections = this.sectionToSubSections(section);

        if (this.options.on.length) {
            var subsectionAllowed = false;

            for (var i = 0; i < this.options.on.length; i++) {
                for (var j = 0; j < subsections.length; j++) {
                    if (this.options.on[i] == subsections[j]) {
                        subsectionAllowed = true;
                    }
                }
            }

            if (!subsectionAllowed) {
                return false;
            }
        }

        if (this.options.off.length) {
            var subsectionDenied = false;

            for (var i = 0; i < this.options.off.length; i++) {
                for (var j = 0; j < subsections.length; j++) {
                    if (this.options.off[i] == subsections[j]) {
                        subsectionDenied = true;
                    }
                }
            }

            if (subsectionDenied) {
                return false;
            }
        }

        return true;
    };


    Logger.prototype.log = function(message, section){
        if (this.isAllowed(section)) {
            this.options.do(message, section);
        }
    };

    if (exports) {
        exports.Logger = Logger;
    } else {
        window.UserStory = window.UserStory || {};
        window.UserStory.Logger = Logger;
    }
})();
