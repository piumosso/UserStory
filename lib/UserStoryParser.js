var _ = require('underscore');


var UserStoryParser = {
    regexp: /(^@([\w\.]+\b)|\s+@([\w\.]+\b))/ig,

    parse: function(script, options){
        var that = this,
            output = [];

        _.each(script.split('\n'), function(line){
            var parserResult,
                lineWithoutComment,
                loggerArgs,
                loggerCall;

            parserResult = that.parseLine(line);
            if (parserResult) {
                lineWithoutComment = parserResult.shift();
                loggerArgs = _.map(parserResult, function(str){
                    return '\'' + str + '\'';
                }).join(', ');
                loggerCall = options.loggerName + '(' + loggerArgs + ');';

                output.push(lineWithoutComment + loggerCall);
            } else {
                output.push(line);
            }
        });

        return output.join('\n');
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
            commentData.unshift(parts.join('//'));
            return commentData;
        } else {
            return null;
        }
    },

    parseComment: function(comment){
        var result = [], regexpResult, message = null, section;

        while (regexpResult = this.regexp.exec(comment)) {
            section = regexpResult[2] || regexpResult[3];
            if (message === null) {
                message = comment.slice(0, this.regexp.lastIndex - section.length - 1);
                result.push(message.trim());
            }
            result.push(section);
        }

        return result.length ? result : null;
    }
};


module.exports = UserStoryParser;
