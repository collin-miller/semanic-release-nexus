export interface INexusOptions {
    username?: string;
    password?: string;
    retryStrategy?: (times: number) => number | void | null;
}

export const DEFAULT_NEXUS_OPTIONS: INexusOptions = {
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
};
