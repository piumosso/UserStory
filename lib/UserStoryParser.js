var UserStoryParser = {
    regexp: /(^@([\w\.]+\b)|\s+@([\w\.]+\b))/ig,

    parse: function(line){
        var parts,
            comment,
            commentData;

        parts = line.split('//');
        if (parts.length === 0) {
            return null;
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
