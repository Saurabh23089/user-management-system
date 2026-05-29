import {Response,NextFunction} from 'express';
import {AuthRequest} from '../types/express'
import {AppError} from '../utils/appError'

type role = 'admin' | 'user';

function authorizeUser(allowedRoles:role[]){
    return (
        req:AuthRequest,
        res:Response,
        next:NextFunction
    ) => {
        try {
           const user = req.user;

           if(!user){
            throw new AppError('Unauthorized',401);

           }

           if(!allowedRoles.includes(user.role)){
            throw new AppError('Forbidden',403);
           }

           next();

        }
        catch(error){
           console.log('Error while role check',error);
           next(error);
        }
    }
}

export {
    authorizeUser
}

