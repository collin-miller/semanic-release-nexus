export const getFilename = (path: string): string => {
    const isWindows = process.platform === 'win32';
    if (!isWindows) {
        if (path.includes('/')) {
            return path.split('/').pop()!;
        }
        return path;
    }
    if (path.includes('\\')) {
        return path.split('\\').pop()!;
    }
    return path;
};
