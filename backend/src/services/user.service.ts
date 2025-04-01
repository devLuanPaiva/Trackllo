import prisma from '../database/db.js'
import type { CreateUserInput, UpdateUserInput, User } from '../models/user.model.js'


export default class UserService {
    static async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany({
            include: {
                boards: true,
                tasks: true
            }
        })
    }

    static async getUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
            include: {
                boards: true,
                tasks: true
            }
        })
    }

    static async createUser(data: CreateUserInput): Promise<User> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (existingUser) {
            throw new Error('Email already in use')
        }

        return prisma.user.create({
            data: {
                ...data,
            },
            include: {
                boards: true,
                tasks: true
            }
        })
    }

    static async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
            include: {
                boards: true,
                tasks: true
            }
        })
    }

    static async deleteUser(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return prisma.user.delete({
            where: { id },
            include: {
                boards: true,
                tasks: true
            }
        })
    }
}