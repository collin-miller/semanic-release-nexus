import { Context } from 'semantic-release';
import { IPluginConfig } from './config';
import { IPluginOptions } from './options';

export const resolveOptions = (config: IPluginConfig, ctx: Context): IPluginOptions => {
    return {
        nexusHost: config.nexusHost || ctx.env.NX_HOST || ctx.env.NEXUS_HOST,
        nexusRepo: config.nexusHost || ctx.env.NX_HOST || ctx.env.NEXUS_HOST,
        assets: config.assets,
        auth: {
            username: ctx.env.NX_USER || ctx.env.NEXUS_USER || undefined,
            password: ctx.env.NX_PASSWORD || ctx.env.NEXUS_PASSWORD || undefined,
        },
    } as IPluginOptions;
};
