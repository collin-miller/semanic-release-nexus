export const PluginSchema = {
    type: 'object',
    properties: {
        nexusHost: {
            type: ['string', 'null'],
        },
        nexusRepo: {
            type: ['string', 'null'],
        },
        assets: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            additionalItems: false,
            items: [
                {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'string',
                        },
                        name: {
                            type: ['string', 'null'],
                        },
                    },
                    required: ['path'],
                },
            ],
        },
    },
    required: ['assets'],
};
