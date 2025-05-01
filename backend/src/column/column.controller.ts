import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
	Req,
	Res,
	ParseUUIDPipe,
} from "@nestjs/common"
import { Request, Response } from "express"
import { CreateColumnDto, UpdateColumnDto } from "./column.dto"
import { successResponse, errorResponse } from "../utils/global-response"
import { ColumnService } from "./column.service"

@Controller("columns")
export class ColumnController {
	constructor(private readonly columnService: ColumnService) {}

	@Get("board/:boardId")
	async getBoardColumns(
		@Param("boardId", ParseUUIDPipe) boardId: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string

		try {
			const columns = await this.columnService.getBoardColumns(boardId, userId)
			return successResponse(res, columns)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar coluna", 500, [errorMessage])
		}
	}

	@Get(":id")
	async getColumnById(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string

		try {
			const column = await this.columnService.getColumnById(id, userId)
			return successResponse(res, column)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar coluna", 500, [errorMessage])
		}
	}

	@Post()
	async createColumn(
		@Body() body: CreateColumnDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string

		try {
			const newColumn = await this.columnService.createColumn(
				body.boardId,
				userId,
				body.title,
			)
			return successResponse(res, newColumn, 201)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao criar coluna", 500, [errorMessage])
		}
	}

	@Put(":id")
	async updateColumn(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() body: UpdateColumnDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string

		try {
			const updated = await this.columnService.updateColumn(id, userId, body)
			return successResponse(res, updated)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao modificar coluna", 500, [errorMessage])
		}
	}

	@Delete(":id")
	async deleteColumn(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string

		try {
			const deleted = await this.columnService.deleteColumn(id, userId)
			return successResponse(res, deleted)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao deletar coluna", 500, [errorMessage])
		}
	}
}
