import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from '../utils/appError';
import { AuthRequest } from '../types/express';

dotenv.config();

async function authValidationMiddleware(
    req:AuthRequest,
    res:Response,
    next:NextFunction
){
   
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new AppError('Unauthorized',401);
        }
        

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string)
        req.user = decoded;
        next();
    }
    catch(error){
        next(new AppError('Unauthorized',401))
    }

}

export {
    authValidationMiddleware
}