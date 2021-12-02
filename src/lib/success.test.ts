import { describe, expect, it, jest } from '@jest/globals';
import { success } from './success';

describe('success', () => {
    it('should log the success message', () => {
        const logMock = jest.fn();
        success({ assets: [{ path: './some-path' }] }, { logger: { log: logMock, error: jest.fn() }, env: {} });
        expect(logMock).toBeCalledTimes(1);
        expect(logMock.mock.calls).toMatchSnapshot();
    });
});
