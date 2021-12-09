import AggregateError from 'aggregate-error';
import { Context } from 'semantic-release';
import glob from 'tiny-glob';
import Nexus, { INexusOptions } from './nexus';
import { IPluginConfig, resolveOptions } from './plugin';
import { getFilename } from './get-filename';

export const publish = async (pluginConfig: IPluginConfig, context: Context) => {
    const { logger } = context;
    const options = resolveOptions(pluginConfig, context);
    const nxOptions = {} as INexusOptions;
    if (options.auth.password && options.auth.username) {
        nxOptions.password = options.auth.password;
        nxOptions.username = options.auth.username;
    }
    const nexusClient = new Nexus(options.nexusHost, nxOptions);

    const promises = options.assets.map(async (element) => {
        const [filePath] = await glob(element.path, { filesOnly: true });
        const artifactName = element.name ? element.name : getFilename(filePath);
        logger.log(`Deploying ${filePath} as ${artifactName} to ${options.nexusHost}`);
        return nexusClient.deploy(options.nexusPath, artifactName, filePath);
    });

    await Promise.all(promises).catch((err) => {
        logger.error(err.message);
        throw new AggregateError([err.message]);
    });
};
