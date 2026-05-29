import * as userDao from '../dao/userDao'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from '../utils/appError'
import { sanitizeUser } from '../utils/sanitizeUser'

dotenv.config();

interface signUpPayload {
    name: string,
    email: string,
    password: string,
    role?: "admin" | "manager" | "user"
}

interface loginPayload {
    email: string,
    password: string
}


async function userSignUp(payload: signUpPayload) {
    const { name, email, password, role } = payload;

    console.log('name', name, email);

    if (!name || !email || !password) {
        // return res.status(400).json({
        //     success:false,
        //     message:'Please provide all required fields'
        // })
        throw new Error('Please provide all required fields')
    }

    if (password.length < 6) {
        throw new Error('Password must be atleast 6 characters');
    }

    if (role === 'admin') {
        const adminCount = await userDao.countUsersByRole('admin');
        if (adminCount >= 3) {
            throw new Error('Max 3 admins allowed');
        }
    }

    const isDuplicateUser = await userDao.findUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isDuplicateUser) {
        throw new Error('Email already exists');
    }

    const userPayload = {
        ...payload,
        password: hashedPassword,
        role: role || 'user'

    }

    const user = await userDao.createUser(userPayload);
    return user;

}

async function userLogin(payload: loginPayload) {
    const { email, password } = payload;

    console.log('email', email, password);


    if (!email || !password) {
        throw new Error('Invalid Credentails');
    }

    const isExistingUser = await userDao.findUserByEmail(email);

    console.log('existing user', isExistingUser);

    if (!isExistingUser) {
        throw new Error('Invalid Credentials');
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        isExistingUser?.password
    )

    if (!isPasswordMatch) {
        throw new AppError('Invalid Credentials', 400)
    }

    const accessToken = jwt.sign(
        {
            id: isExistingUser.id,
            role: isExistingUser.role
        },
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: '30m'
        }
    )

    const refreshToken = jwt.sign(
        {
            id: isExistingUser.id,
            role: isExistingUser.role
        },
        process.env.JWT_REFRESH_SECRET as string,
        {
            expiresIn: "7d"
        }
    );

    await userDao.saveRefreshToken(isExistingUser, refreshToken);

    const sanitizedUser = sanitizeUser(isExistingUser);


    return {
        user: sanitizedUser,
        tokens: {
            accessToken,
            refreshToken,
        }

    }

}

async function getUserProfile(id:number){

        const userData = await userDao.findUserById(Number(id));

        if(!userData){
            throw new AppError('User not found',400);
        }
    
        return sanitizeUser(userData);  
}

async function getAllUsers(
   page:number,
   limit:number
) {

    const {users,totalUsers} = await userDao.getAllUsers(page,limit);
    const sanitizedUsers = users.map((user) => sanitizeUser(user));

    return {
        users:sanitizedUsers,
        meta:{
            page:page,
            limit:limit,
            totalUsers:totalUsers,
            totalPages:Math.ceil(totalUsers/limit)
        }
    }
    


}



export {
    userSignUp,
    userLogin,
    getUserProfile,
    getAllUsers
}