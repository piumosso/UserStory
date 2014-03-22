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


describe('Logging method', function(){
    var us;

    us = new UserStory({
        on: ['a.b', 'k']
    });

    beforeEach(function(){
        us.configure({
            logger: jasmine.createSpy('logger')
        });
    });

    it('should be called with one allowed section', function(){
        us.log(['message'], ['a.b']);
        expect(us.options.logger).toHaveBeenCalledWith(['message'], ['a.b']);
    });
    it('should be called with several sections, including all allowed', function(){
        us.log(['message'], ['a.b', 'k']);
        expect(us.options.logger).toHaveBeenCalledWith(['message'], ['a.b', 'k']);
    });
    it('should be called with several sections, one of whom is disabled', function(){
        us.log(['message'], ['x', 'k']);
        expect(us.options.logger).toHaveBeenCalledWith(['message'], ['x', 'k']);
    });
    it('should not be called with several sections, among which are all prohibited', function(){
        us.log(['message'], ['x', 'y']);
        expect(us.options.logger).not.toHaveBeenCalled();
    });
});


describe('UserStory.on method', function () {
    it('should allow single section', function () {
        var us;

        us = new UserStory();
        us.on('a.b');
        expect(us.isAllowed('a.b')).toBeTruthy();
        expect(us.isAllowed('xxx')).toBeFalsy();
    });
    it('should allow multiple sections', function () {
        var us;

        us = new UserStory();
        us.on(['a.b', 'q.w']);
        expect(us.isAllowed('a.b')).toBeTruthy();
        expect(us.isAllowed('q.w')).toBeTruthy();
        expect(us.isAllowed('xxx')).toBeFalsy();
    });
});


describe('UserStory.off method', function () {
    it('should disable single section', function () {
        var us;

        us = new UserStory();
        us.on('a.b');
        us.off('a.b.c');
        expect(us.isAllowed('a.b')).toBeTruthy();
        expect(us.isAllowed('a.b.c')).toBeFalsy();
    });
    it('should disable multiple sections', function () {
        var us;

        us = new UserStory();
        us.on('a.b');
        us.off(['a.b.c', 'w']);
        expect(us.isAllowed('a.b')).toBeTruthy();
        expect(us.isAllowed('a.b.c')).toBeFalsy();
        expect(us.isAllowed('w')).toBeFalsy();
    });
});


describe('UserStory.reset method', function () {
    it('should clean allowed and disabled sections', function () {
        var us;

        us = new UserStory();
        us.on('a.b');
        us.off('a.b.c');
        us.reset();
        expect(us.isAllowed('a.b')).toBeFalsy();
        expect(us.isAllowed('a.b.c')).toBeFalsy();
    });
});
