import AggregateError from 'aggregate-error';
import { Context } from 'semantic-release';
import Nexus, { INexusOptions } from './nexus';
import { IPluginConfig, resolveOptions } from './plugin';

export const publish = async (pluginConfig: IPluginConfig, context: Context) => {
    const { logger } = context;
    const options = resolveOptions(pluginConfig, context);
    const nxOptions = {} as INexusOptions;
    if (options.auth.password && options.auth.username) {
        nxOptions.password = options.auth.password;
        nxOptions.username = options.auth.username;
    }
    const nexusClient = new Nexus(options.nexusHost, nxOptions);
    const promises = options.assets.map((element) => {
        const artifactName = element.name ? element.name : element.path;
        logger.log(`Deploying ${element.path} as ${artifactName} to ${options.nexusRepo}`);
        return nexusClient.deploy(options.nexusRepo, artifactName, element.path);
    });

    await Promise.all(promises).catch((err) => {
        logger.error(err.message);
        throw new AggregateError([err.message]);
    });
};
