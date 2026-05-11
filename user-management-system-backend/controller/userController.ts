import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService'

async function userSignup(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const signedUpUser = await userService.userSignUp(req.body);
        console.log('fsdf', req.body);

        res.status(201).json({
            success: true,
            message: 'User signed up successfully'
        })
    }
    catch (error) {
        // next(error);
    }

}

async function userLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const loggedInUserData = await userService.userLogin(req.body);

        console.log('logged in user data',loggedInUserData);
        

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: loggedInUserData
        })
    }
    catch (error) {
        next(error);
    }
}

export { userSignup,userLogin }