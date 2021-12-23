import { describe, expect, jest, it } from '@jest/globals';
import AggregateError from 'aggregate-error';
import { verify } from './verify';

describe('verify', () => {
    it('should fail schema validation', async () => {
        await expect(
            verify({ assets: [] }, { logger: { log: jest.fn(), error: jest.fn() }, env: { key: 'value' } }),
        ).rejects.toThrowError(AggregateError);
    });
    it('should pass schema validation', async () => {
        await expect(
            verify(
                {
                    nexusHost: 'http://localhost',
                    nexusPath: 'some-project-name',
                    assets: [
                        {
                            path: 'dist/some-package-v*.tar.gz',
                        },
                        {
                            path: 'dist/other-package-v*.tar.gz',
                        },
                    ],
                },
                {
                    logger: { log: jest.fn(), error: jest.fn() },
                    env: { NX_HOST: 'https://some-host', NX_REPO: 'some-repo' },
                },
            ),
        ).resolves.toBeUndefined();
    });
    it('should fail schema validation for an additional asset map', async () => {
        await expect(
            verify(
                {
                    assets: [
                        { path: 'dist2/some-package-v*.tar.gz' },
                        // @ts-ignore: invalid type
                        { path: 'dist2/other-package-v*.tar.gz', booger: true },
                    ],
                },
                { logger: { log: jest.fn(), error: jest.fn() }, env: { key: 'value' } },
            ),
        ).rejects.toThrowError(AggregateError);
    });
});
