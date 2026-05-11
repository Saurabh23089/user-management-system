"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
const userDao = __importStar(require("../dao/userDao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = require("../utils/appError");
dotenv_1.default.config();
async function userSignUp(payload) {
    const { name, email, password, role } = payload;
    if (!name || !email || !password) {
        // return res.status(400).json({
        //     success:false,
        //     message:'Please provide all required fields'
        // })
        throw new Error('Please provide all required fields');
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
    if (isDuplicateUser) {
        throw new Error('Email already exists');
    }
    const userPayload = {
        ...payload,
        role: role || 'user'
    };
    const user = await userDao.createUser(userPayload);
    return user;
}
async function userLogin(payload) {
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
    const isPasswordMatch = bcrypt_1.default.compare(password, isExistingUser?.password);
    if (!isPasswordMatch) {
        throw new appError_1.AppError('Invalid Credentials', 400);
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: isExistingUser._id,
        role: isExistingUser.role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30m'
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: isExistingUser._id,
        role: isExistingUser.role
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });
    return {
        accessToken,
        refreshToken,
        data: isExistingUser
    };
}
