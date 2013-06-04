var UserStoryParser = require('../lib/UserStoryParser').UserStoryParser;


describe('UserStoryUserStoryParser', function(){
    it('should return null on strings without sections', function(){
        expect(UserStoryParser.parse('')).toBe(null);
        expect(UserStoryParser.parse('jgfjbdhsafgjhf jdhsga fndv cbdnsa')).toBe(null);
        expect(UserStoryParser.parse(' f fdsf @ fds fds@rd ')).toBe(null);
    });

    it('should return text and sections on strings with sections', function(){
        expect(UserStoryParser.parse('@a.b.c')).toEqual(['', 'a.b.c']);
        expect(UserStoryParser.parse('@a.b.c  @d.e')).toEqual(['', 'a.b.c', 'd.e']);
        expect(UserStoryParser.parse('w@123 test string @ac @b')).toEqual(['w@123 test string', 'ac', 'b']);
    });
});
