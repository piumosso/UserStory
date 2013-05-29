var Logger = require('../lib/Logger').Logger;


describe('Logger without restrictions', function(){
    var logger = new Logger();

    it('should tell all logs', function(){
        expect(logger.isAllowed('app.section')).toBeTruthy();
    });
});


describe('Logger with restrictions', function(){
    var logger = new Logger({
            on: ['a.b', 'k', 'k.l'],
            off: ['a.b.c', 'k', 'x']
        });

    it('should tell only on-logs except off-sections', function(){
        expect(logger.isAllowed('a.b')).toBeTruthy();
        expect(logger.isAllowed('a.b.d')).toBeTruthy();
        expect(logger.isAllowed('a.b.c')).toBeFalsy();
    });

    it('should not tell off logs', function(){
        expect(logger.isAllowed('k')).toBeFalsy();
        expect(logger.isAllowed('k.l')).toBeFalsy();
    });
});


describe('Logger().sectionToSubSections method', function(){
    var logger = new Logger();

    it('should make correct arrays with section sub parts', function(){
        expect(logger.sectionToSubSections('')).toEqual(['']);
        expect(logger.sectionToSubSections('a')).toEqual(['a']);
        expect(logger.sectionToSubSections('a.b.c')).toEqual(['a', 'a.b', 'a.b.c']);
    });
});
