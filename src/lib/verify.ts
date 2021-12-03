import Ajv from 'ajv';
import AggregateError from 'aggregate-error';
import glob from 'tiny-glob';
import { Context } from 'semantic-release';
import { IPluginAssets, IPluginConfig, PluginSchema, resolveOptions } from './plugin';

export const isValidUrl = (url: string | undefined) => {
    try {
        if (url) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _ = new URL(url);
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
};

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

/**
 * A method to verify the inputs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const verify = async (pluginConfig: IPluginConfig, context: Context) => {
    // const { logger } = context;
    const errors: string[] = [];

    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(PluginSchema, pluginConfig);
    // Collect schema validation errors
    if (!valid) {
        ajv.errors?.forEach((element) => errors.push(element.message || 'validation error'));
    }
    // verify a valid file is found at each asset path
    errors.push(...verifyAssets(pluginConfig.assets, context));
    const options = resolveOptions(pluginConfig, context);
    if (!isValidUrl(options.nexusHost)) {
        errors.push(`The nexus host provided (${options.nexusHost}) is invalid.`);
    }
    if (typeof options.nexusRepo === 'undefined') {
        errors.push(`The nexus repo (${options.nexusRepo}) was not provided.`);
    }
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};
