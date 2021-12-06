import axios from 'axios';
import { afterEach, beforeEach, describe, expect, jest, it } from '@jest/globals';
import fs from 'fs';
import Nexus from './nexus';
import { INexusOptions } from './nexus.options';

jest.mock('axios');

describe('Nexus Client', () => {
    it('should instantiate with default values', () => {
        const nx = new Nexus();
        expect(nx.host).toEqual('localhost');
        expect(nx.options).toMatchSnapshot();
    });

    it('should work with override values', () => {
        const nx = new Nexus('some-host', {
            apiKey: 'some-api-key',
            retryStrategy: (number) => {
                return number;
            },
        } as INexusOptions);
        expect(nx.host).toEqual('some-host');
        expect(nx.options.retryStrategy?.(1)).toEqual(1);
        expect(nx.options).toMatchSnapshot();
    });

    it('should return correct retry strategy', () => {
        const nx = new Nexus();
        expect(nx.options.retryStrategy?.(2)).toEqual(100);
    });
    describe('upload to nexus', () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const originalMath = global.Math;
        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve({ success: true }));

            const mockMath = Object.create(global.Math);
            mockMath.random = () => 0.5;
            global.Math = mockMath;
        });

        afterEach(() => {
            global.Math = originalMath;
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
        it('should upload', async () => {
            const fsMock = jest.spyOn(fs, 'createReadStream');
            const postMock = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: {} }));
            const nx = new Nexus();
            await nx.deploy('some-repo', 'some-artifact-name', '/some/path/to/artifact.zip');

            expect(fsMock).toHaveBeenCalledWith('/some/path/to/artifact.zip');
            expect(postMock).toHaveBeenCalledWith(
                'localhost/repository/some-repo',
                expect.objectContaining({
                    data: expect.any(Object),
                    headers: {
                        'content-type':
                            'multipart/form-data; boundary=--------------------------555555555555555555555555',
                    },
                }),
            );
        });
        it('should upload w/ auth', async () => {
            const fsMock = jest.spyOn(fs, 'createReadStream');
            const postMock = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: {} }));
            const nx = new Nexus('localhost', { username: 'some-user', password: 'some-password' });

            await nx.deploy('some-repo', 'some-artifact-name', '/some/path/to/artifact.zip');

            expect(fsMock).toHaveBeenCalledWith('/some/path/to/artifact.zip');
            expect(postMock).toHaveBeenCalledTimes(1);

            await expect(postMock).toHaveBeenCalledWith(
                'localhost/repository/some-repo',
                expect.objectContaining({
                    data: expect.any(Object),
                    headers: {
                        'content-type':
                            'multipart/form-data; boundary=--------------------------555555555555555555555555',
                    },
                    auth: { password: 'some-password', username: 'some-user' },
                }),
            );
        });
        it('should catch error and raise', async () => {
            const fsMock = jest.spyOn(fs, 'createReadStream');
            const postMock = jest
                .spyOn(axios, 'post')
                .mockImplementation(() => Promise.reject(new Error('Some strange error')));
            const nx = new Nexus();
            await expect(nx.deploy('some-repo', 'some-artifact-name', '/some/path/to/artifact.zip')).rejects.toThrow();

            expect(fsMock).toHaveBeenCalledWith('/some/path/to/artifact.zip');
            expect(postMock).toHaveBeenCalled();
        });
    });
});
