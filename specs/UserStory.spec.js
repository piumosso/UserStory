var UserStory = require('../lib/UserStory').UserStory;


describe('UserStory without restrictions', function () {
    var options = {
        on: ['*'],
        off: []
    };

    it('should tell all logs', function () {
        var us;

        us = new UserStory(options);
        expect(us.isAllowed('app.section')).toBeTruthy();
    });
});


describe('UserStory with default configuration', function () {
    it('should not tell all logs', function () {
        var us;

        us = new UserStory();
        expect(us.isAllowed('app.section')).toBeFalsy();
    });
});


describe('UserStory with restrictions', function () {
    var options = {
        on: ['a.b', 'k', 'k.l'],
        off: ['a.b.c', 'k', 'x']
    };

    it('should tell only on-logs except off-sections', function () {
        var us;

        us = new UserStory(options);
        expect(us.isAllowed('a.b')).toBeTruthy();
        expect(us.isAllowed('a.b.d')).toBeTruthy();
        expect(us.isAllowed('a.b.c')).toBeFalsy();
    });

    it('should not tell off logs', function () {
        var us;

        us = new UserStory(options);
        expect(us.isAllowed('k')).toBeFalsy();
        expect(us.isAllowed('k.l')).toBeFalsy();
    });
});


describe('UserStory.sectionToSubSections method', function () {
    it('should make correct arrays with section sub parts', function () {
        var us;

        us = new UserStory();
        expect(us.sectionToSubSections('')).toEqual(['']);
        expect(us.sectionToSubSections('*')).toEqual(['*']);
        expect(us.sectionToSubSections('a')).toEqual(['a']);
        expect(us.sectionToSubSections('a.b.c')).toEqual(['a', 'a.b', 'a.b.c']);
    });
});
