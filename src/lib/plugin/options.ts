import { IPluginConfig } from './config';

export interface IPluginOptions extends IPluginConfig {
    auth: {
        username?: string;
        password?: string;
    };
}
