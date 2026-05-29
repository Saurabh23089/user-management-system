import express from 'express';
// import { connectDB } from './config/dbConnection'
import { config } from './config/config'
import { errorHandler } from './middlewares/errorMiddleware'
import { Response, Request, NextFunction } from 'express';
import configureRoutes from './routes/configureRoutes';
import {rateLimiter} from './middlewares/rateLimiter'
import prisma from './config/prisma';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// app.use(rateLimiter)

// connectDB();

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the user management system backend');
})

app.get('/health', (_req: Request, res: Response) => {
    console.log('fafdh');
    res.status(200).send('Backend is healthy')
})

configureRoutes(app);

app.use(errorHandler);

async function startServer() {
  try {
    

    await prisma.$connect();
    console.log('Database connection result');

    console.log('Database connected successfully');


    const PORT = config.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });

  } catch (error) {

    console.error('Failed to start server');

    console.error(error);

    process.exit(1);
  }
}

startServer();

