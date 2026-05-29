
import prisma from '../config/prisma'

type userRole = "admin" | "manager" | "user";

interface userPayload {
    id?: number,
    name: string,
    email: string,
    password: string,
    role?: userRole
}

async function findUserByEmail(email: string) {
    console.log('email is ', email);
    return await prisma.user.findUnique({
        where: {
            email,
            is_active: true
        }
    })
}

async function createUser(payload: userPayload) {
    return await prisma.user.create({
        data: payload
    });
}

async function countUsersByRole(role: userRole) {
    return prisma.user.count({
        where: {
            role
        }
    })
}

async function saveRefreshToken(user: userPayload, refreshToken: string) {
    await prisma.user.update({
        where: { id: user.id },
        data: {
            refresh_token: refreshToken
        }
    })
}

async function findUserById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

async function getAllUsers(page: number, limit: number) {

    const [users, totalUsers] = await prisma.$transaction([
        prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit
        }),
        prisma.user.count()

    ])

    return {
        users,
        totalUsers
    }


}

export {
    findUserByEmail,
    createUser,
    countUsersByRole,
    saveRefreshToken,
    findUserById,
    getAllUsers
}