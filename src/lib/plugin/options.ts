import { IPluginConfig } from './config';

export interface IPluginOptions extends IPluginConfig {
    nexusHost: string;
    nexusPath: string;
    auth: {
        username?: string;
        password?: string;
    };
}
