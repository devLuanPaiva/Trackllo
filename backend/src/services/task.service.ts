import prisma from "../database/db.js";
import type { Task } from "../models/task.model.js";

export default class TaskService {
    static async getAllTasks(userId: string): Promise<Task[]> {
        return prisma.task.findMany({
            where: { userId },
            include: {
                user: true,
                column: true
            }
        })
    }

    static async getTaskById(id: string, userId: string): Promise<Task | null> {
        return prisma.task.findUnique({
            where: { id, userId },
            include: {
                user: true,
                column: true
            }
        })
    }

    static async createTask(data: {
        title: string
        description: string
        image?: string
        userId: string
        columnId?: string
    }): Promise<Task> {
        const userExists = await prisma.user.findUnique({
            where: { id: data.userId }
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        if (data.columnId) {
            const columnExists = await prisma.column.findUnique({
                where: { id: data.columnId }
            })

            if (!columnExists) {
                throw new Error('Column not found')
            }
        }

        return prisma.task.create({
            data,
            include: {
                user: true,
                column: true
            }
        })
    }

    static async updateTask(
        id: string,
        userId: string,
        data: {
            title?: string
            description?: string
            image?: string | null
            columnId?: string | null
        }
    ): Promise<Task> {
        const task = await prisma.task.findUnique({
            where: { id, userId }
        })

        if (!task) {
            throw new Error('Task not found or not owned by user')
        }

        if (data.columnId) {
            const columnExists = await prisma.column.findUnique({
                where: { id: data.columnId }
            })

            if (!columnExists) {
                throw new Error('Column not found')
            }
        }

        return prisma.task.update({
            where: { id },
            data,
            include: {
                user: true,
                column: true
            }
        })
    }

    static async deleteTask(id: string, userId: string): Promise<Task> {
        const task = await prisma.task.findUnique({
            where: { id, userId }
        })

        if (!task) {
            throw new Error('Task not found or not owned by user')
        }

        return prisma.task.delete({
            where: { id },
            include: {
                user: true,
                column: true
            }
        })
    }

    static async moveTask(
        taskId: string,
        userId: string,
        newColumnId: string | null
    ): Promise<Task> {
        const task = await prisma.task.findUnique({
            where: { id: taskId, userId }
        })

        if (!task) {
            throw new Error('Task not found or not owned by user')
        }

        if (newColumnId) {
            const columnExists = await prisma.column.findUnique({
                where: { id: newColumnId }
            })

            if (!columnExists) {
                throw new Error('Column not found')
            }
        }

        return prisma.task.update({
            where: { id: taskId },
            data: { columnId: newColumnId },
            include: {
                user: true,
                column: true
            }
        })
    }
}