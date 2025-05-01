import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaProvider } from "../database/prisma.provider"
import { Column } from "@prisma/client"

@Injectable()
export class ColumnService {
	constructor(private readonly prisma: PrismaProvider) {}

	async getBoardColumns(boardId: string, userId: string): Promise<Column[]> {
		const board = await this.prisma.board.findUnique({
			where: { id: boardId, userId },
		})

		if (!board) {
			throw new NotFoundException(
				"Quadro não encontrado ou não pertence ao usuário.",
			)
		}

		return this.prisma.column.findMany({
			where: { boardId },
			include: {
				tasks: true,
				board: true,
			},
		})
	}

	async getColumnById(id: string, userId: string): Promise<Column | null> {
		const column = await this.prisma.column.findUnique({
			where: { id },
			include: {
				board: true,
			},
		})

		if (!column || column.board.userId !== userId) {
			throw new NotFoundException(
				"Coluna não encontrada ou não pertence ao usuário.",
			)
		}

		return this.prisma.column.findUnique({
			where: { id },
			include: {
				tasks: true,
				board: true,
			},
		})
	}

	async createColumn(
		boardId: string,
		userId: string,
		title: string,
	): Promise<Column> {
		const board = await this.prisma.board.findUnique({
			where: { id: boardId, userId },
		})

		if (!board) {
			throw new NotFoundException(
				"Quadro não encontrado ou não pertence ao usuário.",
			)
		}

		return this.prisma.column.create({
			data: {
				title,
				boardId,
			},
			include: {
				tasks: true,
				board: true,
			},
		})
	}

	async updateColumn(
		id: string,
		userId: string,
		data: { title?: string },
	): Promise<Column> {
		const column = await this.prisma.column.findUnique({
			where: { id },
			include: {
				board: true,
			},
		})

		if (!column || column.board.userId !== userId) {
			throw new NotFoundException(
				"Coluna não encontrada ou não pertence ao usuário.",
			)
		}

		return this.prisma.column.update({
			where: { id },
			data,
			include: {
				tasks: true,
				board: true,
			},
		})
	}

	async deleteColumn(id: string, userId: string): Promise<Column> {
		const column = await this.prisma.column.findUnique({
			where: { id },
			include: {
				board: true,
			},
		})

		if (!column || column.board.userId !== userId) {
			throw new NotFoundException(
				"Coluna não encontrada ou não pertence ao usuário.",
			)
		}

		return this.prisma.column.delete({
			where: { id },
			include: {
				tasks: true,
				board: true,
			},
		})
	}
}
