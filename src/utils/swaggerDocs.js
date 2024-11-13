exports.swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'AdoptMe API Documentation',
            description: 'Comprehensive documentation for the AdoptMe application, a platform to facilitate pet adoption.',
            version: '1.0.0',
            contact: {
                name: 'Support Team',
                email: 'support@adoptme.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        }
    },
    apis: ['src/docs/**/*.yaml']
};
