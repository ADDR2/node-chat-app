const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Me';
        const coords = {
            latitude: 1,
            longitude: 1
        };

        const responseObject = generateLocationMessage(from, coords);
        expect(responseObject).toInclude({
            from,
            url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
        });
        expect(responseObject.createdAt).toBeA('number');
    });
});