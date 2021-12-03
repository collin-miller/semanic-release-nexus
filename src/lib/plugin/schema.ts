export const PluginSchema = {
    type: 'object',
    properties: {
        nexusHost: {
            type: 'string',
        },
        nexusRepo: {
            type: 'string',
        },
        assets: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    path: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                },
                required: ['path'],
            },
            minItems: 1,
            uniqueItems: true,
        },
    },
    required: ['assets'],
};
