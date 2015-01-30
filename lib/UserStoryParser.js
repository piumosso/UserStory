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

        loggerCall = loggerName + '([' + messageParts.join(', ') + '], ' + JSON.stringify(sections) + ');';

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
            messageParts = null,
            sections  =[],
            section;

        while (regexpResult = this.regexp.exec(comment)) {
            section = regexpResult[2] || regexpResult[3];
            if (messageParts === null) {
                messageParts = this.parseMessage(comment.slice(0, this.regexp.lastIndex - section.length - 1));
            }
            sections.push(section);
        }

        if (messageParts || sections.length) {
            return {
                messageParts: messageParts,
                sections: sections
            };
        } else {
            return null;
        }
    },

    parseMessage: function(messageSource){
        var messageString,
            messageRawParts,
            resultMessageParts,
            result;

        // Prepare message string
        messageString = messageSource.replace(/\"/ig, '\\\"'); // Escape single quotes
        messageString = messageString.trim();

        // Make array of message parts that contain fragments of message string corresponding variable inclusion
        messageRawParts = messageString.split('[');
        for (var i = messageRawParts.length  -1; i > 0; i--) {
            if (messageRawParts[i - 1] === '') {
                messageRawParts[i] = '[' + messageRawParts[i];
            }
        }
        messageRawParts = _.filter(messageRawParts, function(item){
            return item !== '';
        });

        // Formation of this array another which contains fragments of line with their types (string or variable)
        resultMessageParts = [{
            type: 'string',
            value: messageRawParts[0]
        }];
        for (var j = 0; j < messageRawParts.length; j++) {
            var closeBracketIndex,
                variable,
                mustBeJsonified;

            closeBracketIndex = _.lastIndexOf(messageRawParts[j], ']');
            if (closeBracketIndex === -1) {
                continue;
            }

            variable = messageRawParts[j].slice(0, closeBracketIndex);
            mustBeJsonified = variable.indexOf('`') === 0;
            if (mustBeJsonified) {
                variable = variable.slice(1);
            }
            resultMessageParts[resultMessageParts.length - 1].value += '[' + variable + '=';
            if (mustBeJsonified) {
                variable = 'JSON.stringify(' + variable + ')';
            }
            resultMessageParts.push({
                type: 'variable',
                value: variable
            });
            resultMessageParts.push({
                type: 'string',
                value: messageRawParts[j].slice(closeBracketIndex)
            });
        }

        // Convert it into a result
        result = _.map(resultMessageParts, function(resultMessagePart){
            if (resultMessagePart.type === 'string') {
                return '"' + (resultMessagePart.value || '') + '"';
            } else {
                return resultMessagePart.value;
            }
        });

        return result;
    }
};


module.exports = UserStoryParser;
