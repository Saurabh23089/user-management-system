import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management System API',
            version: '1.0.0',
            description: 'Production grade RBAC User Management API'
        },

        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ['./routes/*.ts', './controller/*.ts']
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;