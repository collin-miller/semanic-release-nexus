import { Context } from 'semantic-release';
import { IPluginConfig, publish as publishNx, success as successNx, verify } from './lib';

let verified: boolean;

export const verifyConditions = async (pluginConfig: IPluginConfig, context: Context) => {
    await verify(pluginConfig, context);
    verified = true;
};

export const publish = async (pluginConfig: IPluginConfig, context: Context) => {
    if (!verified) {
        await verify(pluginConfig, context);
        verified = true;
    }

    await publishNx(pluginConfig, context);
};

export const success = async (pluginConfig: IPluginConfig, context: Context) => {
    if (!verified) {
        await verify(pluginConfig, context);
        verified = true;
    }

    await successNx(pluginConfig, context);
};
