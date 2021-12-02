import { describe, expect, jest, it } from '@jest/globals';
import AggregateError from 'aggregate-error';
import glob from 'tiny-glob';
import { verify } from './verify';

jest.mock('tiny-glob');

describe('verify', () => {
    const mockedGlob = glob as jest.Mocked<typeof glob>;

    it('should fail schema validation', async () => {
        await expect(
            verify({ assets: [] }, { logger: { log: jest.fn(), error: jest.fn() }, env: { key: 'value' } }),
        ).rejects.toThrowError(AggregateError);
    });
    it('should pass schema validation', async () => {
        (mockedGlob as jest.Mock).mockImplementation(() => ['dist/some-package-v1.tar.gz']);
        const logMock = jest.fn();
        await expect(
            verify(
                { assets: [{ path: 'dist/some-package-v*.tar.gz' }] },
                { logger: { log: logMock, error: jest.fn() }, env: { key: 'value' } },
            ),
        ).resolves.toBeUndefined();
        expect(mockedGlob).toHaveBeenCalled();
        expect(mockedGlob).toHaveBeenCalledWith('dist/some-package-v*.tar.gz', { filesOnly: true });
        expect(logMock).toBeCalled();
        expect(logMock.mock.calls).toMatchSnapshot();
    });
});
