export interface INexusOptions {
    username?: string;
    password?: string;
    retryStrategy?: (times: number) => number | void | null;
    scheme?: string;
}

export const DEFAULT_NEXUS_OPTIONS: INexusOptions = {
    scheme: 'http://',
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
};
