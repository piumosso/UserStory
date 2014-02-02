var UserStoryParser = require('../lib/UserStoryParser');


describe('UserStoryUserStoryParser', function(){
    it('should return null on strings without sections', function(){
        expect(UserStoryParser.parseComment('')).toBe(null);
        expect(UserStoryParser.parseComment('jgfjbdhsafgjhf jdhsga fndv cbdnsa')).toBe(null);
        expect(UserStoryParser.parseComment(' f fdsf @ fds fds@rd ')).toBe(null);
    });

    it('should return text and sections on strings with sections', function(){
        expect(UserStoryParser.parseComment('@a.b.c')).toEqual(['', 'a.b.c']);
        expect(UserStoryParser.parseComment('@a.b.c  @d.e')).toEqual(['', 'a.b.c', 'd.e']);
        expect(UserStoryParser.parseComment('w@123 test string @ac @b')).toEqual(['w@123 test string', 'ac', 'b']);
    });

    it('should parse comment in line', function(){
        expect(UserStoryParser.parse('123h hgfhf123gf gf323gf ')).toBe(null);
        expect(UserStoryParser.parse('123h hgfhf123gf gf323gf // fds hgfdhsga ')).toBe(null);
        expect(UserStoryParser.parse('jhgjhg //   @a.b.c')).toEqual(['jhgjhg ', '', 'a.b.c']);
        expect(UserStoryParser.parse('jhgjhg // @a //@a.b.c')).toEqual(['jhgjhg // @a ', '', 'a.b.c']);
    });
});
