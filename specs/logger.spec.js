var Logger = require('../lib/Logger').Logger;


describe('Logger without restrictions', function(){
    var doyMock = jasmine.createSpy(),
        logger = new Logger({
            do: doyMock
        });

    it('should tell all logs', function(){
        logger.log('Hi!', 'app.section');
        expect(doyMock).toHaveBeenCalledWith('Hi!', 'app.section');
    });
});


describe('Logger with restrictions', function(){
    var doMock = jasmine.createSpy(),
        logger = new Logger({
            do: doMock,
            on: ['a.b', 'k', 'k.l'],
            off: ['a.b.c', 'k', 'x']
        });

    it('should tell only on-logs except off-sections', function(){
        logger.log('', 'a.b');
        expect(doMock).toHaveBeenCalled();
        logger.log('', 'a.b.d');
        expect(doMock).toHaveBeenCalled();
        logger.log('', 'a.b.c');
        expect(doMock).not.toHaveBeenCalled();
    });

    it('should not tell off logs', function(){
        logger.log('', 'k');
        expect(doMock).not.toHaveBeenCalled();
        logger.log('', 'k.l');
        expect(doMock).not.toHaveBeenCalled();
    });
});
