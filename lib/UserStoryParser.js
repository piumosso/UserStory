var _ = require('underscore');


var UserStoryParser = {
    regexp: /(^@([\w\.]+\b)|\s+@([\w\.]+\b))/ig,

    parse: function(script, options){
        var that = this,
            output = [];

        options = _.extend({
            loggerName: 'UserStory.log'
        }, options);

        _.each(script.split('\n'), function(line){
            var parserResult;

            parserResult = that.parseLine(line);
            if (parserResult) {
                output.push(
                    parserResult.line +
                    that.getLoggerCall(options.loggerName, parserResult.messageParts, parserResult.sections)
                );
            } else {
                output.push(line);
            }
        });

        return output.join('\n');
    },

    getLoggerCall: function(loggerName, messageParts, sections){
        var loggerCall;

        loggerCall = loggerName + '(' + JSON.stringify(messageParts) + ', ' + JSON.stringify(sections) + ');';

        return loggerCall;
    },

    parseLine: function(line){
        var parts,
            comment,
            commentData,
            prevPart;

        parts = line.split('//');
        if (parts.length === 1) {
            return null;
        }
        if (parts.length > 1) {
            prevPart = parts[parts.length - 2].trim();
            if (prevPart[prevPart.length - 1] === ',') {
                return null;
            }
        }

        comment = parts.pop();
        commentData = this.parseComment(comment);
        if (commentData) {
            commentData.line = parts.join('//');

            return commentData;
        } else {
            return null;
        }
    },

    parseComment: function(comment){
        var regexpResult,
            message = null, 
            sections  =[],
            section;

        while (regexpResult = this.regexp.exec(comment)) {
            section = regexpResult[2] || regexpResult[3];
            if (message === null) {
                message = comment.slice(0, this.regexp.lastIndex - section.length - 1);
                message = message.replace(/\"/ig, '\\\"'); // Escape single quotes
                message = message.trim();
            }
            sections.push(section);
        }

        if (message || sections.length) {
            return {
                messageParts: [message],
                sections: sections
            };
        } else {
            return null;
        }
    }
};


module.exports = UserStoryParser;
