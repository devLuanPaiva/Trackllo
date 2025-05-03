import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaProvider } from "../database/prisma.provider"

@Injectable()
export class BoardService {
	constructor(private readonly prisma: PrismaProvider) {}

	async getUserBoards(userId: string) {
		return this.prisma.board.findMany({
			where: { userId },
			include: {
				user: true,
				columns: {
					include: {
						tasks: true,
					},
				},
			},
		})
	}

	async getBoardById(id: string, userId: string) {
		return this.prisma.board.findUnique({
			where: { id, userId },
			include: {
				user: true,
				columns: {
					include: {
						tasks: true,
					},
				},
			},
		})
	}

	async createBoard(userId: string, title: string) {
		const userExists = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (!userExists) {
			throw new NotFoundException("Usuário não encontrado")
		}

		return this.prisma.board.create({
			data: {
				userId,
				title,
				columns: {
					createMany: {
						data: [
							{ title: "To do" },
							{ title: "In Progress" },
							{ title: "Done" },
						],
					},
				},
			},
			include: {
				user: true,
				columns: {
					include: {
						tasks: true,
					},
				},
			},
		})
	}

	async deleteBoard(id: string, userId: string) {
		const board = await this.prisma.board.findUnique({
			where: { id, userId },
		})

		if (!board) {
			throw new NotFoundException("Quadro não encontrado para este usuário")
		}

		return this.prisma.board.delete({
			where: { id },
			include: {
				user: true,
				columns: {
					include: {
						tasks: true,
					},
				},
			},
		})
	}
}
