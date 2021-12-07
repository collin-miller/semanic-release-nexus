import { Context } from 'semantic-release';
import { IPluginConfig, fail as failNx, publish as publishNx, success as successNx, verify } from './lib';

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

export const fail = async (pluginConfig: IPluginConfig, context: Context) => {
    if (!verified) {
        await verify(pluginConfig, context);
        verified = true;
    }

    await failNx(pluginConfig, context);
};
