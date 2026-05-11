import {Request,Response,NextFunction} from 'express';

export const errorHandler = (
    error:any,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const statusCode = error.statusCode || 500;
    console.log('status code in error middleware',statusCode);
    
    return res.status(statusCode).json({
        success:false,
        message:error.message || 'Something went wrong'
    })
}

module.exports = {errorHandler}