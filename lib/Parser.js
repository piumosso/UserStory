var Parser = function(){},
    c1 = '\033[35m',
    c2 = '\033[36m',
    c3 = '\033[37m';


Parser.prototype.regexp = /(^@([\w\.]+\b)|\s+@([\w\.]+\b))/ig;


Parser.prototype.parse = function(string){
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
};


exports.Parser = Parser;
