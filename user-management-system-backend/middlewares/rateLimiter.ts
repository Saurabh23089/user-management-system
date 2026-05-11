import {Request,Response,NextFunction} from 'express';

interface IRequestLog {
    timestamps:number[]
}

const requestStore = new Map<string,IRequestLog>();

interface RateLimiterOptions {
    windowMs:number,
    maxRequests:number
}

export function rateLimiter(options:RateLimiterOptions){

    const {windowMs,maxRequests} = options;

    return (
        req:Request,
        res:Response,
        next:NextFunction
    ) => {
       try {
          const ip = req.ip || 
          req.socket.remoteAddress || 'unknown';

          const currentTime = Date.now();

          const windowStart = currentTime - windowMs;

          const existingRecord = requestStore.get(ip);

          if(!existingRecord){
            requestStore.set(ip,{
                timestamps:[currentTime]
            })

            return next();

          }

          const validRequests = existingRecord.timestamps.filter(timestamp => timestamp > windowStart);

          if(validRequests.length>=maxRequests){
            res.status(429).json({
                success:false,
                message:'Too many requests,please try again later'
            })
          }

          validRequests.push(currentTime);

          requestStore.set(ip,{
            timestamps:validRequests
          })

          console.log('rate limiter is running');

          next();

       }
       catch(error){
            next(error);
       }
    }

}
