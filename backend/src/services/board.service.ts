import prisma from "../database/db.js";
import type { Board } from "../models/board.model.js";

export default class BoardService {
    static async getUserBoards(userId: string): Promise<Board[]> {
        return prisma.board.findMany({
            where: { userId },
            include: {
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
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
    }

    static async createBoard(userId: string): Promise<Board> {
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.board.create({
            data: {
                userId,
                columns: {
                    createMany: {
                        data: [
                            { title: 'To Do' },
                            { title: 'In Progress' },
                            { title: 'Done' }
                        ]
                    }
                }
            },
            include: {
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
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
    }
}