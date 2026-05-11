import User from '../models/user'

type userRole = "admin" | "manager" | "user";

interface userPayload {
    name: string, 
    email: string, 
    password: string,
    role?: userRole
}

async function findUserByEmail(email: string) {
    return User.findOne({ email: email })
}

async function createUser(payload:userPayload){
    return User.create(payload);
}

async function countUsersByRole(role:userRole){
    return User.countDocuments({role});
}

export {
    findUserByEmail,
    createUser,
    countUsersByRole
}