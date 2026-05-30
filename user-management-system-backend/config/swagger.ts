import swaggerJsdoc from 'swagger-jsdoc';
import userSwaggerDocs from '../docs/user.swagger';

const options = {
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

    paths: {
      ...userSwaggerDocs
    }
  },

  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;