import { Context } from 'semantic-release';
import { IPluginConfig } from './plugin';

export const success = async (_pluginConfig: IPluginConfig, context: Context) => {
    const { logger } = context;
    logger.log('This is success.');
};
