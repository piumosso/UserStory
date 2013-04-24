var Logger = require('../lib/Logger').Logger;


describe('Logger without restrictions', function(){
    var sayMock = jasmine.createSpy(),
        logger = new Logger({
            say: sayMock
        });

    it('should tell all logs', function(){
        logger.log('Hi!', 'app.section');
        expect(sayMock).toHaveBeenCalledWith('Hi!', 'app.section');
    });
});


describe('Logger with restrictions', function(){
    var sayMock = jasmine.createSpy(),
        logger = new Logger({
            say: sayMock,
            tell: ['a.b', 'k', 'k.l'],
            shutUp: ['a.b.c', 'k', 'x']
        });

    it('should tell only allowed logs except sections in shutUp', function(){
        logger.log('Msg', 'a.b');
        expect(sayMock).toHaveBeenCalled();
        logger.log('Msg', 'a.b.d');
        expect(sayMock).toHaveBeenCalled();
        logger.log('Msg', 'a.b.c');
        expect(sayMock).not.toHaveBeenCalled();
    });

    it('should not tell shutUp logs', function(){
        logger.log('Msg', 'k');
        expect(sayMock).not.toHaveBeenCalled();
        logger.log('Msg', 'k.l');
        expect(sayMock).not.toHaveBeenCalled();
    });
});
