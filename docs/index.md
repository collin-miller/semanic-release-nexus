# semantic-release-nexus

⚠️ This project is a work in progress. API Documentation will be published when version 1 is complete. ⚠️

## Description

`semantic-release-nexus` is a plugin developed for the (semantic-release)[https://github.com/semantic-release/semantic-release] framework. The plugin project will provide the ability to publish artifacts to raw Nexus repositories (e.g. tar files, zip files, binaries, etc.).

### Options

| Option      | Description                                                        | Default                                         |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| `nexusHost` | **Required.** The URL of the Nexus Host.                           | `NX_URL` or `NEXUS_URL` environment variable.   |
| `nexusRepo` | **Required.** The Nexus Repo Name.                                 | `NX_REPO` or `NEXUS_REPO` environment variable. |
| `assets`    | An array of files to upload to the release. See [assets](#assets). | -                                               |

#### assets

Can be a [glob](https://github.com/isaacs/node-glob#glob-primer) or and `Array` of
[globs](https://github.com/isaacs/node-glob#glob-primer) and `Object`s with the following properties:

| Property | Description                                                                                              | Default                          |
| -------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `path`   | **Required.** A [glob](https://github.com/isaacs/node-glob#glob-primer) to identify the files to upload. | -                                |
| `name`   | The name of the downloadable file on the GitHub release.                                                 | File name extracted from `path`. |
