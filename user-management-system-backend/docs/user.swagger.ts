import { OpenAPIV3 } from 'openapi-types';

const userSwaggerDocs: OpenAPIV3.PathsObject = {
  '/users/signup': {
    post: {
      tags: ['Users'],
      summary: 'Register a new user',
      description: 'Creates a new user account',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password'],
              properties: {
                name: {
                  type: 'string',
                  example: 'Saurabh'
                },
                email: {
                  type: 'string',
                  example: 'saurabh@gmail.com'
                },
                password: {
                  type: 'string',
                  example: 'password123456789'
                },
                role: {
                  type: 'string',
                  enum: ['admin', 'manager', 'user'],
                  example: 'user'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'User signed up successfully'
        },
        '400': {
          description: 'Validation error'
        }
      }
    }
  },

  '/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Login user',
      description: 'Authenticates user and returns JWT tokens',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  example: 'saurabh@gmail.com'
                },
                password: {
                  type: 'string',
                  example: 'password123456789'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Login successful'
        },
        '401': {
          description: 'Invalid credentials'
        }
      }
    }
  },

  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user profile',
      description: 'Fetch user profile by id',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'User ID'
        }
      ],
      responses: {
        '200': {
          description: 'User fetched successfully'
        },
        '401': {
          description: 'Unauthorized'
        },
        '403': {
          description: 'Forbidden'
        },
        '404': {
          description: 'User not found'
        }
      }
    }
  }
};

export default userSwaggerDocs;