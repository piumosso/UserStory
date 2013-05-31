var Parser = require('../lib/Parser').Parser;


describe('Parser', function(){
    var parser = new Parser();

    it('should return null on strings without sections', function(){
        expect(parser.parse('')).toBe(null);
        expect(parser.parse('jgfjbdhsafgjhf jdhsga fndv cbdnsa')).toBe(null);
        expect(parser.parse(' f fdsf @ fds fds@rd ')).toBe(null);
    });

    it('should return text and sections on strings with sections', function(){
        expect(parser.parse('@a.b.c')).toEqual(['', 'a.b.c']);
        expect(parser.parse('@a.b.c  @d.e')).toEqual(['', 'a.b.c', 'd.e']);
        expect(parser.parse('w@123 test string @ac @b')).toEqual(['w@123 test string', 'ac', 'b']);
    });
});
