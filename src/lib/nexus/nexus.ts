import axios, { AxiosRequestConfig } from 'axios';
import Debug from 'debug';
import FormData from 'form-data';
import fs from 'fs';
import { INexusOptions, DEFAULT_NEXUS_OPTIONS } from './nexus.options';

const debug = Debug('nexus');

export default class Nexus {
    /**
     * options getter
     */
    public get options(): INexusOptions {
        return this.nexusOptions;
    }

    /**
     * options setter
     */
    public set options(options: INexusOptions) {
        this.nexusOptions = Object.assign({} as INexusOptions, DEFAULT_NEXUS_OPTIONS, options);
    }

    /**
     * constructor
     */
    constructor(public host: string = 'localhost', private nexusOptions: INexusOptions = {} as INexusOptions) {
        this.options = nexusOptions;
    }

    /**
     * deploy
     */
    public async deploy(pathPrefix: string, artifactName: string, artifactPath: string): Promise<void> {
        const form = new FormData();

        form.append('raw.directory', pathPrefix);
        form.append('raw.asset1', fs.createReadStream(artifactPath));
        form.append('raw.asset1.filename', `${artifactName}`);

        let config = {
            headers: form.getHeaders(),
        } as AxiosRequestConfig;

        config = {
            data: form,
            headers: form.getHeaders(),
        };
        if (this.options.username && this.options.password) {
            config.auth = { username: this.options.username, password: this.options.password };
        }
        try {
            await axios.post(`${this.host}/service/rest/v1/components?repository=raw`, form, config);
        } catch (error) {
            debug('%o', error);
            throw error;
        }
    }
}
