import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService'
import ApiResponse from '../utils/apiResponse'
import { AppError } from '../utils/appError';

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

        // for signup also use apiResponse but after the email verification implementation
    }
    catch (error) {
        console.log('error', error)
        next(error);
    }

}

async function userLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const loggedInUserData = await userService.userLogin(req.body);

        console.log('logged in user data', loggedInUserData);

        return res.status(200).json(
            new ApiResponse(
                true,
                'User logged in successfully',
                loggedInUserData
            )
        )

    }
    catch (error) {
        console.log('controller error', error);
        next(error);
    }
}

async function getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const id = req?.params?.id;

        console.log('id is ',id);

        if (!id) {
            throw new AppError('User id is required', 400);
        }

        const userData = await userService.getUserProfile(Number(id))

        return res.status(200).json(
            new ApiResponse(
                true,
                'User profile fetched successfully',
                userData
            )
        )

    }
    catch (error) {
        console.log('Error while getting user profile', error);
        next(error);
    }

}


async function getAllUsers(
    req:Request,
    res:Response,
    next:NextFunction
){
    try {
        
        const page = Number(req?.query?.page) || 1;
        const limit = Number(req?.query?.limit) || 10;

        const userData = await userService.getAllUsers(page,limit);

        return res.status(200).json(
            new ApiResponse(
                true,
                'Users fetched successfully',
                userData
            )
        )


    }
    catch(error) {
        console.log('Error while fteching all the users',error);
        next(error);
    }
}

export { userSignup, userLogin,getUserProfile,getAllUsers }