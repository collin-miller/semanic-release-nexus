import { describe, expect, it, jest } from '@jest/globals';
import AggregateError from 'aggregate-error';
import Nexus from './nexus';
import { publish } from './publish';

jest.mock('./nexus');

describe('publish', () => {
    const mockedNexus = Nexus as jest.MockedClass<typeof Nexus>;

    it('should successfully publish', async () => {
        const mockedDeploy = jest.fn().mockImplementation(() => Promise.resolve(null));
        (mockedNexus as jest.Mock).mockImplementationOnce(() => {
            return {
                deploy: mockedDeploy,
            };
        });
        const logMock = jest.fn();
        await expect(
            publish(
                {
                    nexusHost: 'localhost',
                    nexusRepo: 'some-repo',
                    assets: [{ path: './some-path' }, { path: './some-path-2', name: 'artifact-2' }],
                },
                { logger: { log: logMock, error: jest.fn() }, env: {} },
            ),
        ).resolves.toBeUndefined();
        expect(logMock).toBeCalledTimes(2);
        expect(logMock.mock.calls).toMatchSnapshot();
        expect(mockedDeploy).toBeCalledTimes(2);
        expect(mockedDeploy.mock.calls).toMatchSnapshot();
        expect(mockedNexus).toHaveBeenCalledTimes(1);
        expect(mockedNexus.mock.calls).toMatchSnapshot();
    });

    it('should successfully publish w/ auth', async () => {
        const mockedDeploy = jest.fn().mockImplementation(() => Promise.resolve(null));
        (mockedNexus as jest.Mock).mockImplementationOnce(() => {
            return {
                deploy: mockedDeploy,
            };
        });
        const logMock = jest.fn();
        await expect(
            publish(
                {
                    nexusHost: 'localhost',
                    nexusRepo: 'some-repo',
                    assets: [{ path: './some-path' }, { path: './some-path-2', name: 'artifact-2' }],
                },
                {
                    logger: { log: logMock, error: jest.fn() },
                    env: { NX_USER: 'some-user', NX_PASSWORD: 'some-password' },
                },
            ),
        ).resolves.toBeUndefined();
        expect(logMock).toBeCalledTimes(2);
        expect(logMock.mock.calls).toMatchSnapshot();
        expect(mockedDeploy).toBeCalledTimes(2);
        expect(mockedDeploy.mock.calls).toMatchSnapshot();
        expect(mockedNexus).toHaveBeenCalledTimes(1);
        expect(mockedNexus.mock.calls).toMatchSnapshot();
    });

    it('should raise exception when publish fails', async () => {
        const mockedDeploy = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve(null))
            .mockImplementationOnce(() => Promise.reject(Error('I hate you')));
        (mockedNexus as jest.Mock).mockImplementationOnce(() => {
            return {
                deploy: mockedDeploy,
            };
        });
        const logMock = jest.fn();
        const errorMock = jest.fn();
        await expect(
            publish(
                {
                    nexusHost: 'localhost',
                    nexusRepo: 'some-repo',
                    assets: [{ path: './some-path' }, { path: './some-path-2' }],
                },
                { logger: { log: logMock, error: errorMock }, env: {} },
            ),
        ).rejects.toThrowError(AggregateError);
        expect(logMock).toBeCalledTimes(2);
        expect(logMock.mock.calls).toMatchSnapshot();
        expect(errorMock).toBeCalledTimes(1);
        expect(errorMock.mock.calls).toMatchSnapshot();
        expect(mockedDeploy).toBeCalledTimes(2);
        expect(mockedDeploy.mock.calls).toMatchSnapshot();
        expect(mockedNexus).toHaveBeenCalledTimes(1);
        expect(mockedNexus.mock.calls).toMatchSnapshot();
    });
});
