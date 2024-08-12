import swaggerJsDoc from 'swagger-jsdoc';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Collection API',
      version: '1.0.0',
      description: 'API for managing a collection of books',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['../endpoints/v1/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerV1 = Router();

swaggerV1.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerV1;
