var UserStory = require('../lib/UserStory');


describe('UserStory without restrictions', function () {
    var options = {
        on: [],
        off: []
    };

    it('should tell all logs', function () {
        UserStory.configure(options);
        expect(UserStory.isAllowed('app.section')).toBeTruthy();
    });
});


describe('UserStory with restrictions', function () {
    var options = {
        on: ['a.b', 'k', 'k.l'],
        off: ['a.b.c', 'k', 'x']
    };

    it('should tell only on-logs except off-sections', function () {
        UserStory.configure(options);
        expect(UserStory.isAllowed('a.b')).toBeTruthy();
        expect(UserStory.isAllowed('a.b.d')).toBeTruthy();
        expect(UserStory.isAllowed('a.b.c')).toBeFalsy();
    });

    it('should not tell off logs', function () {
        UserStory.configure(options);
        expect(UserStory.isAllowed('k')).toBeFalsy();
        expect(UserStory.isAllowed('k.l')).toBeFalsy();
    });
});


describe('UserStory.sectionToSubSections method', function () {
    it('should make correct arrays with section sub parts', function () {
        expect(UserStory.sectionToSubSections('')).toEqual(['']);
        expect(UserStory.sectionToSubSections('a')).toEqual(['a']);
        expect(UserStory.sectionToSubSections('a.b.c')).toEqual(['a', 'a.b', 'a.b.c']);
    });
});
