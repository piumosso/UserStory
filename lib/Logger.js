var _ = require('underscore');


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


Logger.prototype.isAllowed = function(section){
    if (this.options.on.length) {
        var on = _.find(this.options.on, function(s){
            return section.indexOf(s) === 0;
        });
        if (on.length == 0) {
            return false;
        }
    }
    if (this.options.off.length) {
        var off = _.find(this.options.off, function(s){
            return section.indexOf(s) === 0;
        });
        if (off.length == 0) {
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


exports.Logger = Logger;
