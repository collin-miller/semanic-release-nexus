# semantic-release-nexus

[![Release](https://github.com/collin-miller/semanic-release-nexus/actions/workflows/publish.yaml/badge.svg)](https://github.com/collin-miller/semanic-release-nexus/actions/workflows/publish.yaml) [![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Semantic Release Nexus Plugin

## Description

This project is a plugin for the [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) framework which will allow you to publish an arbitrary file type to a raw Nexus repository. This is great for pushing binaries, tars, zips, etc. to your Nexus instance for usage throughout your environment.

## Install

```bash
yarn add semantic-release-nexus --dev
```

## Usage

```json
{
    "branches": ["main"],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-nexus",
            {
                "nexusHost": "https://some-host.yourdomain.com",
                "nexusPath": "your-super-cool-project",
                "assets": [
                    {
                        "path": "dist/your-super-cool-project-*-darwin.tar.gz"
                    },
                    {
                        "path": "dist/your-super-cool-project-*-linux.tar.gz"
                    },
                    {
                        "path": "dist/your-super-cool-project-*-windows.zip"
                    }
                ]
            }
        ]
    ]
}
```

## Configuration

Authentication is not required but basic auth is supported via environment variables. You may set `NEXUS_USER` and `NEXUS_PASSWORD` (alternatively replacing `NX` for `NEXUS`) environment variables for basic auth.

### Environment Variables

| Variable                       | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `NEXUS_USER`/`NX_USER`         | The Username of the service account used for basic auth. |
| `NEXUS_PASSWORD`/`NX_PASSWORD` | The Password of the service account used for basic auth. |
| `NEXUS_HOST`/`NX_HOST`         | The hostname or CNAME of the Nexus instance.             |
| `NEXUS_PATH`/`NX_PATH`         | The Path/Directory/Group to host your assets.            |

### Options

| Option      | Description                                                        | Default                                         |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| `nexusHost` | The URL of the Nexus Host.                                         | `NX_URL` or `NEXUS_URL` environment variable.   |
| `nexusPath` | The group or path prefix to host the packages in Nexus.            | `NX_PATH` or `NEXUS_PATH` environment variable. |
| `assets`    | An array of files to upload to the release. See [assets](#assets). | -                                               |

#### assets

Can be a [glob](https://github.com/isaacs/node-glob#glob-primer) or and `Array` of
[globs](https://github.com/isaacs/node-glob#glob-primer) and `Object`s with the following properties:

| Property | Description                                                                                              | Default                              |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `path`   | **Required.** A [glob](https://github.com/isaacs/node-glob#glob-primer) to identify the files to upload. | -                                    |
| `name`   | The name of the downloadable file on the GitHub release.                                                 | File name extracted from the `path`. |
