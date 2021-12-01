# semantic-release-github

⚠️ This project is a work in progress. API Documentation will be published when version 1 is complete. ⚠️

### Options

| Option      | Description                                                        | Default                                                                             |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `nexusHost` | The URL of the Nexus Host.                                         | `NX_URL` or `NEXUS_URL` environment variable.                                       |
| `nexusRepo` | The Nexus Repo Name.                                               | The repo name of remote origin (i.e. `basename $(git remote get-url origin) .git`). |
| `assets`    | An array of files to upload to the release. See [assets](#assets). | -                                                                                   |

#### assets

Can be a [glob](https://github.com/isaacs/node-glob#glob-primer) or and `Array` of
[globs](https://github.com/isaacs/node-glob#glob-primer) and `Object`s with the following properties:

| Property | Description                                                                                              | Default                              |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `path`   | **Required.** A [glob](https://github.com/isaacs/node-glob#glob-primer) to identify the files to upload. | -                                    |
| `name`   | The name of the downloadable file on the GitHub release.                                                 | File name extracted from the `path`. |
