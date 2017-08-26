const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Me';
        const text = 'Here I am';

        const responseObject = generateMessage(from, text);
        expect(responseObject).toInclude({
            from,
            text
        });
        expect(responseObject.createdAt).toBeA('number');
    });
});