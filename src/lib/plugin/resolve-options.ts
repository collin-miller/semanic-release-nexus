import AggregateError from 'aggregate-error';
import { Context } from 'semantic-release';
import { IPluginConfig } from './config';
import { IPluginOptions } from './options';

export const resolveOptions = (config: IPluginConfig, ctx: Context): IPluginOptions => {
    const opts = {
        nexusHost: config.nexusHost || ctx.env.NX_HOST || ctx.env.NEXUS_HOST,
        nexusPath: config.nexusPath || ctx.env.NX_PATH || ctx.env.NEXUS_PATH,
        assets: config.assets,
        auth: {
            username: ctx.env.NX_USER || ctx.env.NEXUS_USER || undefined,
            password: ctx.env.NX_PASSWORD || ctx.env.NEXUS_PASSWORD || undefined,
        },
    } as IPluginOptions;

    if (!opts.nexusHost) {
        throw new AggregateError(['Nexus Host is empty or undefined']);
    }
    if (!opts.nexusPath) {
        throw new AggregateError(['Nexus Path is empty or undefined']);
    }
    return opts;
};
