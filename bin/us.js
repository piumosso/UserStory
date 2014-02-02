var _ = require('underscore'),
    program = require('commander'),
    UserStoryParser = require('../lib/UserStoryParser');


program
    .version('0.0.1')
    .option('-l, --logger-name <loggerName>', 'logger function name', 'UserStory.log')
    .parse(process.argv);


process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk){
    var output = [];

    _.each(chunk.split('\n'), function(line){
        var parserResult,
            lineWithoutComment,
            loggerArgs,
            loggerCall;

        // TODO Логику в UserStoryParser
        parserResult = UserStoryParser.parse(line);
        if (parserResult) {
            lineWithoutComment = parserResult.shift();
            loggerArgs = _.map(parserResult, function(str){
                return '\'' + str + '\'';
            }).join(', ');
            loggerCall = program.loggerName + '(' + loggerArgs + ');';

            output.push(lineWithoutComment + loggerCall);
        } else {
            output.push(line);
        }
    });

    process.stdout.write(output.join('\n'));
});
