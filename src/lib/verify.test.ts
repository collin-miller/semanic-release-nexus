import { afterEach, describe, expect, jest, it } from '@jest/globals';
import AggregateError from 'aggregate-error';
import glob from 'tiny-glob';
import { verify } from './verify';

jest.mock('tiny-glob');

describe('verify', () => {
    const mockedGlob = glob as jest.Mocked<typeof glob>;
    afterEach(() => {
        (mockedGlob as jest.Mock).mockReset();
    });
    it('should fail schema validation', async () => {
        await expect(
            verify({ assets: [] }, { logger: { log: jest.fn(), error: jest.fn() }, env: { key: 'value' } }),
        ).rejects.toThrowError(AggregateError);
    });
    it('should pass schema validation', async () => {
        (mockedGlob as jest.Mock)
            .mockImplementationOnce(() => ['dist/some-package-v1.tar.gz'])
            .mockImplementationOnce(() => ['dist/other-package-v2.tar.gz']);
        const logMock = jest.fn();
        await expect(
            verify(
                {
                    assets: [{ path: 'dist/some-package-v*.tar.gz' }, { path: 'dist/other-package-v*.tar.gz' }],
                },
                { logger: { log: logMock, error: jest.fn() }, env: { key: 'value' } },
            ),
        ).resolves.toBeUndefined();
        expect(mockedGlob).toHaveBeenCalledTimes(2);
        expect(mockedGlob).toHaveBeenNthCalledWith(1, 'dist/some-package-v*.tar.gz', { filesOnly: true });
        expect(mockedGlob).toHaveBeenNthCalledWith(2, 'dist/other-package-v*.tar.gz', { filesOnly: true });
        expect(logMock).toBeCalled();
        expect(logMock.mock.calls).toMatchSnapshot();
    });
    it('should fail schema validation for an additional asset map', async () => {
        (mockedGlob as jest.Mock)
            .mockImplementationOnce(() => ['dist2/some-package-v1.tar.gz'])
            .mockImplementationOnce(() => ['dist2/other-package-v2.tar.gz']);
        const logMock = jest.fn();
        await expect(
            verify(
                {
                    assets: [
                        { path: 'dist2/some-package-v*.tar.gz' },
                        // @ts-ignore: invalid type
                        { path: 'dist2/other-package-v*.tar.gz', booger: true },
                    ],
                },
                { logger: { log: logMock, error: jest.fn() }, env: { key: 'value' } },
            ),
        ).rejects.toThrowError(AggregateError);
        expect(mockedGlob).toHaveBeenCalledTimes(2);
        expect(mockedGlob).toHaveBeenNthCalledWith(1, 'dist2/some-package-v*.tar.gz', { filesOnly: true });
        expect(mockedGlob).toHaveBeenNthCalledWith(2, 'dist2/other-package-v*.tar.gz', { filesOnly: true });
        expect(logMock).toBeCalled();
        expect(logMock.mock.calls).toMatchSnapshot();
    });
});
