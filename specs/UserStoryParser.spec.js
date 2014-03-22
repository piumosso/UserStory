var UserStoryParser = require('../lib/UserStoryParser');


describe('UserStoryParser.parseComment', function(){
    it('should return null on strings without sections', function(){
        expect(UserStoryParser.parseComment('')).toBe(null);
        expect(UserStoryParser.parseComment('jgfjbdhsafgjhf jdhsga fndv cbdnsa')).toBe(null);
        expect(UserStoryParser.parseComment(' f fdsf @ fds fds@rd ')).toBe(null);
    });

    it('should return text and sections on strings with sections', function(){
        expect(UserStoryParser.parseComment('@a.b.c')).toEqual({
            messageParts: [''],
            sections: ['a.b.c']
        });
        expect(UserStoryParser.parseComment('@a.b.c  @d.e')).toEqual({
            messageParts: [''],
            sections: ['a.b.c', 'd.e']
        });
        expect(UserStoryParser.parseComment('w@123 test string @ac @b')).toEqual({
            messageParts: ['w@123 test string'],
            sections: ['ac', 'b']
        });
    });
});


describe('UserStoryParser.parseLine', function(){
    it('should parse comment in line', function(){
        expect(UserStoryParser.parseLine('123h hgfhf123gf gf323gf ')).toBe(null);
        expect(UserStoryParser.parseLine('123h hgfhf123gf gf323gf // fds hgfdhsga ')).toBe(null);
        expect(UserStoryParser.parseLine('jhgjhg //   @a.b.c')).toEqual({
            line: 'jhgjhg ',
            messageParts: [''],
            sections: ['a.b.c']
        });
        expect(UserStoryParser.parseLine('jhgjhg // @a //@a.b.c')).toEqual({
            line: 'jhgjhg // @a ',
            messageParts: [''],
            sections: ['a.b.c']
        });
    });

    it('should parse string with quotes correct', function(){
        expect(UserStoryParser.parseLine('// xxx \'yyy\' "zzz" @a.b.c')).toEqual({
            line: '',
            messageParts: ['xxx \'yyy\' \\"zzz\\"'],
            sections: ['a.b.c']
        });
    });

    it('should not parse comment in line that ends with a comma', function(){
        expect(UserStoryParser.parseLine('	flashUrl: 0, // @default: "./FileAPI.flash.swf"')).toBe(null);
    });

    it('should not parse comment in jsdoc', function(){
        expect(UserStoryParser.parseLine('   @param  options  string - a command')).toBe(null);
    });
});


describe('UserStoryParser.parse', function(){
    it('should insert UserStory.log into js-script', function(){
        var src,
            dst;

        src = 'function test(){\n' +
               '    // bar @foo.bar\n' +
               '    return null;\n' +
               '}\n' +
               '\n' +
               '// Run test @foo\n' +
               'test();';
        dst = 'function test(){\n' +
               '    UserStory.log(["bar"], ["foo.bar"]);\n' +
               '    return null;\n' +
               '}\n' +
               '\n' +
               'UserStory.log(["Run test"], ["foo"]);\n' +
               'test();'

        expect(UserStoryParser.parse(src)).toEqual(dst);
        expect(UserStoryParser.parse(src, {loggerName: 'UserStory.log'})).toEqual(dst);
    });
});
