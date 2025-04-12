import prisma from "../database/db";
import type { Board } from "../models/board.model";

export default class BoardService {
    static async getUserBoards(userId: string): Promise<Board[]> {
        return prisma.board.findMany({
            where: { userId },
            include: {
                user: true,
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        });
    }

    static async getBoardById(id: string, userId: string): Promise<Board | null> {
        return prisma.board.findUnique({
            where: { id, userId },
            include: {
                user: true,
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
    }

    static async createBoard(userId: string, title: string): Promise<Board> {
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.board.create({
            data: {
                userId,
                title,
                columns: {
                    createMany: {
                        data: [
                            { title: 'To do' },
                            { title: 'In Progress' },
                            { title: 'Done' }
                        ]
                    }
                }
            },
            include: {
                user: true,
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
    }

    static async deleteBoard(id: string, userId: string): Promise<Board> {
        const board = await prisma.board.findUnique({
            where: { id, userId }
        })

        if (!board) {
            throw new Error('Board not found or not owned by user')
        }

        return prisma.board.delete({
            where: { id },
            include: {
                user: true,
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
    }
}