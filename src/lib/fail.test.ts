import { describe, expect, it, jest } from '@jest/globals';
import { fail } from './fail';

describe('fail', () => {
    it('should log the fail message with single artifact', () => {
        const logMock = jest.fn();
        fail({ assets: [{ path: './some-path' }] }, { logger: { log: logMock, error: jest.fn() }, env: {} });
        expect(logMock).toBeCalledTimes(1);
        expect(logMock.mock.calls).toMatchSnapshot();
    });
    it('should log the fail message with multiple artifacts', () => {
        const logMock = jest.fn();
        fail(
            { assets: [{ path: './some-path-again' }, { path: 'some-artifact' }] },
            { logger: { log: logMock, error: jest.fn() }, env: {} },
        );
        expect(logMock).toBeCalledTimes(1);
        expect(logMock.mock.calls).toMatchSnapshot();
    });
});
