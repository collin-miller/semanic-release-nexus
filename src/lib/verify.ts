import Ajv from 'ajv';
import AggregateError from 'aggregate-error';
import { Context } from 'semantic-release';
import { IPluginConfig, PluginSchema, resolveOptions } from './plugin';

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

/**
 * A method to verify the inputs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const verify = async (pluginConfig: IPluginConfig, context: Context) => {
    const errors: string[] = [];

    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(PluginSchema, pluginConfig);
    // Collect schema validation errors
    if (!valid) {
        ajv.errors?.forEach((element) => errors.push(element.message || 'validation error'));
    }
    // verify a valid file is found at each asset path
    const options = resolveOptions(pluginConfig, context);
    if (!isValidUrl(options.nexusHost)) {
        errors.push(`The nexus host provided (${options.nexusHost}) is invalid.`);
    }
    if (typeof options.nexusPath === 'undefined') {
        errors.push(`The nexus repo (${options.nexusPath}) was not provided.`);
    }
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};
