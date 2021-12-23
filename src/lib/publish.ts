import AggregateError from 'aggregate-error';
import { Context } from 'semantic-release';
import glob from 'tiny-glob';
import Nexus, { INexusOptions } from './nexus';
import { IPluginAssets, IPluginConfig, resolveOptions } from './plugin';
import { getFilename } from './get-filename';

export const verifyAssets = (assets: Array<IPluginAssets>, context: Context): string[] => {
    const errors: string[] = [];
    assets.forEach(async (element) => {
        const files = await glob(element.path, { filesOnly: true });
        if (files.length === 0) {
            errors.push(`No asset was found at path ${element.path}`);
        } else if (files.length > 1) {
            errors.push(`Only one file supported per asset declaration. Files found ${files.join(' ')}`);
        } else {
            context.logger.log(`Found file ${files.join('')} from path ${element.path}`);
        }
    });
    return errors;
};

export const publish = async (pluginConfig: IPluginConfig, context: Context) => {
    const errors: string[] = [];
    const { logger } = context;
    errors.push(...(await verifyAssets(pluginConfig.assets, context)));

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

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
