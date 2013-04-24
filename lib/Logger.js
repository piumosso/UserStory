var _ = require('underscore');


var Logger = function(config){
    this.config = {
        tell: [],
        shutUp: [],
        say: function(message, section){
            console.log(section + ': ' + message);
        }
    };

    if (config) {
        this.configure(config);
    }
};


Logger.prototype.configure = function(config){
    this.config = _.extend({}, this.config, config);
};



Logger.prototype.prepareSection = function(section){
    var parts = section.split('.'),
        result = [];

    _.each(parts, function(part){
        var resultPart;

        if (!result.length) {
            resultPart = part;
        } else {
            resultPart = [result[result.length - 1], part].join('.');
        }

        result.push(resultPart);
    });

    return result;
};



Logger.prototype.isAllowed = function(section){
    var preparedSection = this.prepareSection(section);

    var allowed = _.intersection(this.config.tell, preparedSection);
    var denied = _.intersection(this.config.shutUp, allowed);

    return _.isEmpty(denied);
};


Logger.prototype.log = function(message, section){
    if (this.isAllowed(section)) {
        this.config.say(message, section);
    }
};


exports.Logger = Logger;
