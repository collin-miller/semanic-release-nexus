export interface IPluginAssets {
    path: string;
    name?: string;
}

export interface IPluginConfig {
    nexusHost?: string;
    nexusRepo?: string;
    assets: Array<IPluginAssets>;
}
