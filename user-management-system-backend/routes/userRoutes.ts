import { Router } from 'express';
import { userSignup, userLogin,getUserProfile,verifyEmail } from '../controller/userController';
import { authValidationMiddleware } from '../middlewares/authMiddleWare';
import {authorizeUser} from '../middlewares/authorizeUser'

const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.get('/:id',authValidationMiddleware,authorizeUser(['admin','user']),getUserProfile)
userRoutes.post('/verify-email',verifyEmail)

export default userRoutes;