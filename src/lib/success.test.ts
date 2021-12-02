import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { success } from './success';

describe('success', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log');
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should log the success message', () => {
        success();
        // eslint-disable-next-line no-console
        expect(console.log).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-console
        expect(console.log).toHaveBeenCalledWith('This is success.');
    });
});
