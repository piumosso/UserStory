var UserStoryParser = {
    regexp: /(^@([\w\.]+\b)|\s+@([\w\.]+\b))/ig,

    parse: function(string){
        var result = [], regexpResult, message = null, section;

        while (regexpResult = this.regexp.exec(string)) {
            section = regexpResult[2] || regexpResult[3];
            if (message === null) {
                message = string.slice(0, this.regexp.lastIndex - section.length - 1);
                result.push(message.trim());
            }
            result.push(section);
        }

        return result.length ? result : null;
    }
};


exports.UserStoryParser = UserStoryParser;
