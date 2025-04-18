import prisma from "../database/db";
import type { Column } from '../models/column.model'
export default class ColumnService {
    static async getBoardColumns(boardId: string, userId: string): Promise<Column[]> {
        const board = await prisma.board.findUnique({
            where: { id: boardId, userId }
        })

        if (!board) {
            throw new Error('Quadro não encontrado ou não pertence ao usuário.')
        }

        return prisma.column.findMany({
            where: { boardId },
            include: {
                tasks: true,
                board: true
            }
        })
    }

    static async getColumnById(id: string, userId: string): Promise<Column | null> {
        const column = await prisma.column.findUnique({
            where: { id },
            include: {
                board: true
            }
        })

        if (!column || column.board.userId !== userId) {
            return null
        }

        return prisma.column.findUnique({
            where: { id },
            include: {
                tasks: true,
                board: true
            }
        })
    }

    static async createColumn(boardId: string, userId: string, title: string): Promise<Column> {
        const board = await prisma.board.findUnique({
            where: { id: boardId, userId }
        })

        if (!board) {
            throw new Error('Quadro não encontrado ou não pertence ao usuário.')
        }

        return prisma.column.create({
            data: {
                title,
                boardId
            },
            include: {
                tasks: true,
                board: true
            }
        })
    }

    static async updateColumn(
        id: string,
        userId: string,
        data: { title?: string }
    ): Promise<Column> {
        const column = await prisma.column.findUnique({
            where: { id },
            include: {
                board: true
            }
        })

        if (!column || column.board.userId !== userId) {
            throw new Error('Coluna não encontrada ou não pertence ao usuário.')
        }

        return prisma.column.update({
            where: { id },
            data,
            include: {
                tasks: true,
                board: true
            }
        })
    }

    static async deleteColumn(id: string, userId: string): Promise<Column> {
        const column = await prisma.column.findUnique({
            where: { id },
            include: {
                board: true
            }
        })

        if (!column || column.board.userId !== userId) {
            throw new Error('Coluna não encontrada ou não pertence ao usuário.')
        }

        return prisma.column.delete({
            where: { id },
            include: {
                tasks: true,
                board: true
            }
        })
    }
}