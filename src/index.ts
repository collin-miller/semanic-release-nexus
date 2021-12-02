import { Context } from 'semantic-release';
import { IPluginConfig, verify, success as successNx } from './lib';

let verified: boolean;

export const verifyConditions = async (pluginConfig: IPluginConfig, context: Context) => {
    await verify(pluginConfig, context);
    verified = true;
};

export const success = async (pluginConfig: IPluginConfig, context: Context) => {
    if (!verified) {
        await verify(pluginConfig, context);
        verified = true;
    }

    await successNx(pluginConfig, context);
};
