import { IPluginConfig } from './config';

export interface IPluginOptions extends IPluginConfig {
    nexusHost: string;
    nexusRepo: string;
    auth: {
        username?: string;
        password?: string;
    };
}
