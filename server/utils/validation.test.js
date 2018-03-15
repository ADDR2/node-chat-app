const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const nonStringValue = 3;

        expect(isRealString(nonStringValue)).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        const onlySpacesString = '               ';

        expect(isRealString(onlySpacesString)).toBeFalsy();
    });

    it('should allow string with non-spaces characters', () => {
        const normalString = 'Allow';

        expect(isRealString(normalString)).toBeTruthy();
    });
});