import prisma from '../database/db.js'
import type { CreateUserInput, UpdateUserInput, User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET ?? 'secrettoken'

export default class UserService {
    static async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany({
            include: {
                boards: true,
                tasks: true
            }
        })
    }
    static async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) throw new Error('Invalid credentials')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Invalid credentials')

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' })

        await prisma.user.update({
            where: { id: user.id },
            data: { token },
        })

        return { user, token }
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

    static async createUser(data: { name: string; email: string; password: string }): Promise<User> {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
        if (existingUser) throw new Error('Email already in use')

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
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