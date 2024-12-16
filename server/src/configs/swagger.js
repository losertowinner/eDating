const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'eDating 💌 - Swagger UI',
            version: '1.0.0',
            description: 'Documents API for eDating 💌',
            contact: {
                name: 'ZIN',
                email: 'zin.it.dev@gmail.com'
            },

        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0'
            }
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.routes.js']
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec