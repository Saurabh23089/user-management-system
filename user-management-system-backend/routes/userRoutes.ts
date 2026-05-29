import { Router } from 'express';
import { userSignup, userLogin,getUserProfile } from '../controller/userController';
import { authValidationMiddleware } from '../middlewares/authMiddleWare';
import {authorizeUser} from '../middlewares/authorizeUser'

const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.get('/:id',authValidationMiddleware,authorizeUser(['admin','user']),getUserProfile)

export default userRoutes;