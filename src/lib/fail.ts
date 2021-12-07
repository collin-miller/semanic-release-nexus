import { Context } from 'semantic-release';
import { IPluginConfig } from './plugin';

export const fail = async (pluginConfig: IPluginConfig, context: Context) => {
    let stringifiedArtifacts: string;
    const { logger } = context;
    const artifacts = pluginConfig.assets.map((element) => element.path);
    if (artifacts.length > 1) {
        stringifiedArtifacts = `${artifacts.slice(0, -1).join(', ')} and ${artifacts[artifacts.length - 1]}`;
    } else {
        stringifiedArtifacts = artifacts.pop()!;
    }
    logger.log(`Failed to upload artifact(s): ${stringifiedArtifacts}.`);
};
