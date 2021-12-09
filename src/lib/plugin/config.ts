export interface IPluginAssets {
    path: string;
    name?: string;
}

export interface IPluginConfig {
    nexusHost?: string;
    nexusPath?: string;
    assets: Array<IPluginAssets>;
}
