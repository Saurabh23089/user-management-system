import express from 'express';
import { connectDB } from './config/dbConnection'
import { config } from './config/config'
import { errorHandler } from './middlewares/errorMiddleware'
import { Response, Request, NextFunction } from 'express';
import configureRoutes from './routes/configureRoutes';
import {rateLimiter} from './middlewares/rateLimiter'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:'50mb'}));

app.use(rateLimiter)



connectDB();

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the user management system backend');
})

app.get('/health', (_req: Request, res: Response) => {
    console.log('fafdh');
    res.status(200).send('Backend is healthy')
})

configureRoutes(app);

app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Server is listening on PORT ${config.PORT}`)
})

