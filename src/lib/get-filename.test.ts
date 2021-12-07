import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { getFilename } from './get-filename';

describe('get-filename', () => {
    let originalPlatform;
    beforeAll(() => {
        originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    });
    afterAll(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
    it('should get windows filename from abspath', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32',
        });
        expect(getFilename('C:\\\\HOME\\file.txt')).toEqual('file.txt');
    });
    it('should get windows filename from relpath', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32',
        });
        expect(getFilename('.\\boogers.exe')).toEqual('boogers.exe');
    });
    it('should get windows filename from relpath', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32',
        });
        expect(getFilename('boogers.exe')).toEqual('boogers.exe');
    });
    it('should get linux filename from relpath', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux',
        });
        expect(getFilename('./dist/some-bin')).toEqual('some-bin');
    });
    it('should get linux filename from relpath 2', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux',
        });
        expect(getFilename('some-bin')).toEqual('some-bin');
    });
    it('should get linux filename from abspath', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux',
        });
        expect(getFilename('/bla/some/path/yippee.js')).toEqual('yippee.js');
    });
});
