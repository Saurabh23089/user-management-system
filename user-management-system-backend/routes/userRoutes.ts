import { Router } from 'express';
import { userSignup, userLogin } from '../controller/userController';
import { authValidationMiddleware } from '../middlewares/authMiddleWare';


const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin)

export default userRoutes;