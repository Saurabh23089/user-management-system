import {Express} from 'express';
import userRoutes from './userRoutes'

export default function configureRoutes(app:Express){
    app.use('/api/v1/users',userRoutes)
}